#!/usr/bin/python3

import os 
from happytransformer import HappyGeneration, GENEvalArgs
#--------------------------------------#
path = str(os.environ.get("GPT_ETC_CHECKPOINT"))
print(path)

happy_gen = HappyGeneration(load_path=path)  
args = GENEvalArgs(preprocessing_processes=2)
result = happy_gen.eval("../src/corpus.00.txt", args=args)
print(type(result))  # <class 'happytransformer.happy_trainer.EvalResult'>
print(result)  # EvalResult(loss=3.3437771797180176)
print(result.loss)  # 3.3437771797180176

