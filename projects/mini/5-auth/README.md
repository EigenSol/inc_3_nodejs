# NodeJS Auth

DB Tables

```
- users
id
fname
lname
email
password (hash: md5)
role (admin | employee | client | customer | vendor | member)
created_at
updated_at

- auth_tokens
id
user_id
tokken
valid_till
created_at
updated_at
```

## Auth

- login/
- logout/
- check/ (header ~> 200 | 400)

## Session:

- upon login, a new token is generated
- token is valid for 24 hours
- It is required as Auth header in every request.
- Add auth middleware / guard.

## Details

- api
- make a postman collection (folder ~> auth ~> login,logout,check)