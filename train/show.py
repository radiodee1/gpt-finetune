#!/usr/bin/python3

import os 
from happytransformer import HappyGeneration, GENSettings
#--------------------------------------#
path = os.environ.get("GPT_ETC_CHECKPOINT")
print(path)

happy_gen = HappyGeneration( model_type="GPT-NEO", model_name="EleutherAI/gpt-neo-125M", load_path=path )  # default uses gpt2
args = GENSettings(max_length=15)
result = happy_gen.generate_text("artificial intelligence is ", args=args)    
print(result)  # GenerationResult(text='\xa0a new field of research that has been gaining momentum in recent years.')
print(result.text)  #  a new field of research that has been gaining momentum in recent years.
