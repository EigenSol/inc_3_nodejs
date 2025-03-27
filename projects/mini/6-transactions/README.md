## DB Tables

```
- transaction_categories
id
name (asset | expense | investment | balance)

- transactions
id
type (credit | debit)
ref_id
transaction_category_id
label
notes
amount (5000)
value (5000)
timetamp
created_at
updated_at
created_by (users:id)
```
