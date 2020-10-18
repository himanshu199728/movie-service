'use strict';
const fs = require('fs');
const Validator = require('jsonschema').Validator;

class BaseManager {

    constructor() {
        this.validator = new Validator();
    }

    validate(schemPath, data) {
        if (!data) {
            return {
                valid: false,
                errors: ['Validation fail. Argument should be non-empty of data for valida']
            };
        }

        const schema = fs.readFileSync(process.pwd() + schemPath, { encoding: 'utf8' }).toString();
        const result = this.validator.validate(data, JSON.parse(schema));
        const err = this.formatError(result);
        return err;
    }

    formatError(validationResult) {
        let formattedResult = {};
        formattedResult.valid = validationResult.valid;
        formattedResult.errors = {};
        for (let i = 0; validationResult.errors.length; i++) {
            let error = validationResult.errors[i];
            if (error.property.startsWith('instance.')) {
                const field = error.property.replace('instance.', '');
                if (!formattedResult.errors[field]) {
                    formattedResult.errors[field] = [];
                }
                formattedResult.errors[field].push(error.message)
            } else {
                if (!formattedResult.errors[error.argument]) {
                    formattedResult.errors[error.argument] = [];
                }
                formattedResult.errors[error.argument].push(error.message);
            }
        }
        return formattedResult;
    }
}

module.exports = BaseManager;