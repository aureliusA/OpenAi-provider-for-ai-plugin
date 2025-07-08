## Resources

- [LICENSE](LICENSE)

## Links

- [Strapi website](https://strapi.io/)
- [Strapi documentation](https://docs.strapi.io)

## Installation

```bash
# using yarn
yarn add strapi-provider-openai-provider

# using npm
npm install strapi-provider-openai-provider --save
```

## Configuration

| Variable                | Type                    | Description                                                                                                            | Required | Default   |
| ----------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------- | --------- |
| provider                | string                  | The name of the provider you use                                                                                       | yes      |           |
| providerOptions         | object                  | Provider options                                                                                                       | yes      |           |
| providerOptions.apiKey  | object                  | Api key given to the function setApiKey. Please refer to [openai](https://www.npmjs.com/package/openai) | yes      |           |


### Example

**Path -** `config/plugins.js`

```js
module.exports = ({ env }) => ({
  // ...
    ai: {
        enabled: true,
        config: {
            provider: 'ai-openai',
            providerOptions: {
                apiKey: env('OPENAI_TOKEN'),
            },
        },
    },
  // ...
});
```
