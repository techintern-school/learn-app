const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!!!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

/* TODO create routes:

1. student registration
2. get curriculum for student
3. process submission

*/