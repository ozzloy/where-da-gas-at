* setup
create the file `pyrightconfig.json` from `example.pyrightconfig.json`
```bash
cd backend
pipenv install
pipenv --venv
# output will look like:
# /home/ozzloy/.local/share/virtualenvs/backend-NQ-ykkAT
cp example.pyrightconfig.json pyrightconfig.json
```

open `pyrightconfig.json` and modify the content using the output of
`pipenv --venv`.
