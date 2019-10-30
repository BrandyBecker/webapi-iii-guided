# Middleware Notes
--------------------------------------------------------------------------------------------------------
## Jargon
Seperation of Concerns.
_we do NOT write code for the computer, code is  acommunication device, a way to reveal our intention to the next developer_

**EVERYTHING IS MIDDLEWARE**
Well, almost everything :-)

--------------------------------------------------------------------------------------------------------
## Types ( based on how we got it or who built it )
- _built in middleware_: included w/ express. ex: `express.json()`
- _third party middleware_: must be installed from `npm`
- _custom middleware_: we code these!!

## Types ( based on how it's being used )
- global: rune on every request that comes into the server
- 
--------------------------------------------------------------------------------------------------------
Order matters, it goes TOP to BOTTOM and LEFT to RIGHT .

- npm i helmet //security
- npm i morgan
--------------------------------------------------------------------------------------------------------