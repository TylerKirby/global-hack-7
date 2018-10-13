FROM python:3

WORKDIR /code

COPY requirements.txt /code/

RUN pip install -r requirements.txt

COPY publish.py /code

COPY naa /code/naa

COPY randomuser /code/randomuser

CMD [ "python", "./publish.py" ]
