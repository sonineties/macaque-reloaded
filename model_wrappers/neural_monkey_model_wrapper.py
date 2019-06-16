import os

import numpy as np

from neuralmonkey.dataset import Dataset
from neuralmonkey.experiment import Experiment

from .model_wrapper import ModelWrapper

class NeuralMonkeyModelWrapper(ModelWrapper):
    def __init__(self,
                config_path,
                vars_path,
                images_series=None,
                features_series=None,
                src_captions_series=None):

        if not os.path.isfile(config_path):
            raise ValueError("File {} does not exist.".format(config_path))
        if not os.path.isfile(vars_path):
            raise ValueError("File {} does not exist.".format(vars_path))

        self._config_path = config_path
        self._vars_path = vars_path
        self._images_series = images_series
        self._feature_series = features_series
        self._src_captions_series = src_captions_series

        self._exp = Experiment(config_path=config_path)
        self._exp.build_model()
        self._exp.load_variables([vars_path])


    def run(self, dataset):        
        elems = dataset.elements

        if self._images_series is not None:
            if dataset.preprocessed_images:
                imgs = [e.prepro_img for e in elems]
            elif dataset.raw_images:
                imgs = [e.raw_img for e in elems]
            else:
                dataset.load_raw_imgs()
                imgs = [e.raw_img for e in elems]
            ds = Dataset("macaque_data", {self._images_series: np.array(imgs)}, {})

        elif self._feature_series is not None:
            if dataset.features:
                feats = [e.feature_map for e in elems]
                ds = Dataset("macaque_data", {self._feature_series: np.array(feats)}, {})

        return self._exp.run_model(dataset=ds, write_out=False)
