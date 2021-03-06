from typing import Dict, List

import tensorflow as tf
from typeguard import check_argument_types

from neuralmonkey.attention.base_attention import BaseAttention
from neuralmonkey.decoders.decoder import Decoder
from neuralmonkey.decorators import tensor
from neuralmonkey.runners.base_runner import BaseRunner

import pdb

class WordAlignmentRunner(BaseRunner[BaseAttention]):

    # pylint: disable=too-few-public-methods
    # Pylint issue here: https://github.com/PyCQA/pylint/issues/2607
    class Executable(BaseRunner.Executable["WordAlignmentRunner"]):

        def collect_results(self, results: List[Dict]) -> None:
            self.set_result(outputs=results[0]["alignment"], losses=[],
                            scalar_summaries=None, histogram_summaries=None,
                            image_summaries=None)
    # pylint: enable=too-few-public-methods

    def __init__(self,
                 output_series: str,
                 attention: BaseAttention,
                 decoder: Decoder) -> None:
        check_argument_types()
        BaseRunner[BaseAttention].__init__(self, output_series, attention)

        self._really_decoder = decoder
        self._key = "{}_run".format(decoder.name)

    @tensor
    def fetches(self) -> Dict[str, tf.Tensor]:
        #pdb.set_trace()
        # if self._key not in self.decoder.histories:
        #     raise KeyError("Attention has no recorded histories under "
        #                    "key '{}'".format(self._key))

        # att_histories = self.decoder.histories[self._key]
        # alignment = tf.transpose(att_histories, perm=[1, 2, 0])

        # return {"alignment": alignment}
        return {"alignment": self._really_decoder.runtime_att_weights }

    @property
    def loss_names(self) -> List[str]:
        return []
