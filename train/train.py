#!/usr/bin/python3

import os 
from happytransformer import HappyGeneration, GENTrainArgs, GENEvalArgs
#--------------------------------------#
path = str(os.environ.get("GPT_ETC_CHECKPOINT"))
print(path)


happy_gen = HappyGeneration( model_type="GPT-NEO", model_name="EleutherAI/gpt-neo-125M", load_path=path )  # default uses gpt2
#args = GENSettings(max_length=15)
args = GENTrainArgs(num_train_epochs=5) 

#happy_gen = HappyGeneration(load_path=path)  
eval_args = GENEvalArgs(preprocessing_processes=2)
result = happy_gen.eval("../src/corpus.00.txt", args=eval_args)

print("before", type(result))  # <class 'happytransformer.happy_trainer.EvalResult'>
print(result)  # EvalResult(loss=3.3437771797180176)
print(result.loss)  # 3.3437771797180176

#result = happy_gen.generate_text("artificial intelligence is ", args=args)    
#print(result)  # GenerationResult(text='\xa0a new field of research that has been gaining momentum in recent years.')
#print(result.text)  #  a new field of research that has been gaining momentum in recent years.

happy_gen.train("../src/corpus.00.txt", args=args);

happy_gen.save(path)

eval_args = GENEvalArgs(preprocessing_processes=2)
result = happy_gen.eval("../src/corpus.00.txt", args=eval_args)

print("after", type(result))  # <class 'happytransformer.happy_trainer.EvalResult'>
print(result)  # EvalResult(loss=3.3437771797180176)
print(result.loss)  # 3.3437771797180176


