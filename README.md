# How start landing
Что бы запустить проект, нужно:
  - Скопировать проект командой: git clone git@github.com:fakel-ast/teplica.git
  - Создать виртаульное окружение:
    - Для windows: 
      - В папке conf прописать команду: python -m venv venv
    - Для linux:
      - В папке conf прописать команду: python3 -m venv venv
  - Активировать его:
    - Для windows: 
      - В папке conf прописать команду: venv\Scripts\activate
    - Для linux:
      - В папке conf прописать команду: source venv/bin/activate
  - Установить нужные пакеты:
    - Для windows: 
      - В папке conf прописать команду: pip install -r requirements.txt
    - Для linux:
      - Скорее всего так же)
  - Запустить django проложение: в папке standart (где лежит manage.py) прописать: python manage.py runserver
