# password-utils

Utils for checking validity of password.

### Exposed Functions

##### isCommon(password, opts)
Case-insensitive check if password is commonly-used. Returns true if password is commonly-used. Returns false otherwise.

Parameter      | Type    | Description    |
| ------------- |-------------|-------------|
|password      |  String | Password to be checked |
| opts      |JSON      |```Optional``` Options object containing **restriction** & **exact** params |
| opts.restriction      |Integer    |```Optional``` Restricts password checker to top-n commonly-used passwords. Default value is 100 |
| opts.exact      |Boolean    |```Optional``` Checks if password is the exactly the same as the commonly-used password. Default value is true. Set to false, if you want to check if the password passed is a substring |

```
var pass = require('password-utils');

// Check if commonly-used
var isCommon = pass.isCommon('ThisIsMyPassword',
  restriction: 50,
  exact: false
});
```