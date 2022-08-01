#!/usr/bin/python3

import os
import shutil
#from happytransformer import HappyGeneration, GENTrainArgs, GENEvalArgs
#--------------------------------------#
path = str(os.environ.get("GPT_ETC_CHECKPOINT"))
print(path)

description = str(os.environ.get("GPT_ETC_CHECKPOINT_DESCRIPTION")).strip()

if len(description) == 0:
    description = "EleutherAI/gpt-neo-125M"
print(description)

description = description.replace("/", ".")

os.chdir(path);

shutil.make_archive(description, format="zip", root_dir=path)

source = path + "/" + description + ".zip"
destination = path + "/../" + description + ".zip"

os.replace(source, destination)
