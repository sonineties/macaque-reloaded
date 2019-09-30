# Macaque

*This repository is a part of my bachelor's thesis. Currently, it is neither running nor is it open to outside contributions.*

Macaque is a client-server application for analyzing inference resutls of models on the tasks of image captioning and multimodal translation, as well as for creating intuitions about the inner workings of such models through visualization and organized presentation of information.

### Prerequisite software
- Python3
- pip
- npm

### Installation

Create a Python virtual environment and activate it:
```
python3 -m venv macaque-venv
source macauqe-venv/bin/activate
```
You can deactivate it later by running `deactivate` from inside your shell.

Clone the repository and install the dependencies by running:
```
git clone https://github.com/saimioul/macaque-reloaded.git
cd macaque-reloaded
./install.sh
```

### Running

`python3 app.py`

After that, go to http://127.0.0.1:5000 in your browser to enjoy the application.
