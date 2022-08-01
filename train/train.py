#!/usr/bin/python3

import os 
from happytransformer import HappyGeneration, GENTrainArgs, GENEvalArgs
#--------------------------------------#
path = str(os.environ.get("GPT_ETC_CHECKPOINT"))
print(path)

description = str(os.environ.get("GPT_ETC_CHECKPOINT_DESCRIPTION")).strip()

if len(description) == 0:
    description = "EleutherAI/gpt-neo-125M"
print(description)



happy_gen = HappyGeneration( model_type="GPT-NEO", model_name=description, load_path=path )  # default uses gpt2
#args = GENSettings(max_length=15)
args = GENTrainArgs(num_train_epochs=5) 

#happy_gen = HappyGeneration(load_path=path)  
eval_args = GENEvalArgs(preprocessing_processes=2)
result = happy_gen.eval("../src/corpus.00.txt", args=eval_args)

print("before", type(result))  # <class 'happytransformer.happy_trainer.EvalResult'>
print(result)  # EvalResult(loss=3.3437771797180176)
print(result.loss)  # 3.3437771797180176

happy_gen.train("../src/corpus.00.txt", args=args);

happy_gen.save(path)

eval_args = GENEvalArgs(preprocessing_processes=2)
result = happy_gen.eval("../src/corpus.00.txt", args=eval_args)

print("after", type(result))  # <class 'happytransformer.happy_trainer.EvalResult'>
print(result)  # EvalResult(loss=3.3437771797180176)
print(result.loss)  # 3.3437771797180176


