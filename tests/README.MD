## Installation

After cloning the repository, you need go to tests folder
```bash
cd tests
```
 After that it should be enough to `npm install` all the dependencies and then proceed to the **Development** step.

```bash
npm install
```

## Development

Running `npx codeceptjs run --verbose Collection/collection_test.js` will start the demo flow.


```bash
npx codeceptjs run --debug --verbose Authentication/login_test.js
npx codeceptjs run --debug --verbose Assets/asset_test.js
```