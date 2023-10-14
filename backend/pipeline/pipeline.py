import io, os
import openai
from PIL import Image

from stability_sdk import client
from stability_sdk.client import generation

openai.api_key = "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"

STABILITY_API_KEY = "sk-tFClvqHpTQZSoBs84X6p1mAZDHWoZTekVwjCA51IBB6ZpYoV"

system_msg = 'You are trying to generate scrapbook photos from a short journal entry. Generate a Stable-Diffusion prompt which is composed of phrases which describe the journal entry. Also include a couple phrases that are somewhat related to the sentiments expressed in the journal entry. When you encounter topics about humans, replace them with analogies in nature. Each phrase should be separated by a comma and a single space. Do not include anything that is outside of the prompt you are responding with. The journal entry is as follows: '


def run_pipeline(user_msg):
    # user_msg = 'Today I did well on my exam, but I also have one tomorrow. I feel a bit relieved, while also anxious.'


    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_msg},
            {"role": "user", "content": user_msg}
        ]
    )

    resp_prompt = response["choiresponse["choices"][0]["message"]["content"]ces"][0]["message"]["content"].replace("Stable-Diffusion prompt: ", "")

    stability_prompt = "nature, no humans, photo, paper texture, "

    stability_prompt += resp_prompt

    print(stability_prompt)

    stability_api = client.StabilityInference(
        host="grpc.stability.ai:443",
        key=STABILITY_API_KEY,
        verbose=True
    )

    answers = stability_api.generate(
        prompt=stability_prompt,
        steps=50, # defaults to 30 if not specified
    )

    for resp in answers:
        for artifact in resp.artifacts:
            if artifact.type == generation.ARTIFACT_IMAGE:
                return artifact.binary