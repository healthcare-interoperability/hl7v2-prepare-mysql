import { PrepareField } from "./PrepareField";
import { CWE } from "@healthcare-interoperability/hl7v2-datatypes";

/**
 * Represents a class for preparing CWE fields for saving records.
 * Extends PrepareField class.
 */
export class PrepareCWEField extends PrepareField {
    /**
     * Constructs a new PrepareCWEField instance.
     * @param {string} field - The field name.
     * @param {CWE} data - The CWE data associated with the field.
     */
    constructor(field, data) {
        if (data instanceof CWE) {
            super(field, data);
        }
    }

    /**
     * Maps CWE codeable concept fields.
     * @param {string} code - The code value.
     * @param {string} display - The display value.
     * @param {string} system - The system value.
     * @param {string} text - The text value.
     * @returns {Object|null} The mapped codeable concept object or null if code or display is missing.
     * @private
     */
    _mapCodeableConcept(code, display, system, text) {
        let codeableConcept = null;
        if (code || display) {
            codeableConcept = { code, display };
            if (system) {
                codeableConcept['system'] = system;
            }
            if (text) {
                codeableConcept['text'] = text;
            }
        }
        return codeableConcept;
    }

    /**
     * Prepares the CWE field for saving records.
     * @returns {Object[]} Array of prepared field objects.
     */
    prepare() {
        super.prepare();
        let fields = [];
        if (this.data instanceof CWE) {
            const fieldNames = { "primary": '', 'alternate': "Alternate", 'second': "SecondAlternate" };

            Object.keys(fieldNames).forEach(fieldName => {
                let fieldPrefix = fieldNames[fieldName];
                let codeableConcept = this._mapCodeableConcept(this.data[`${fieldPrefix}Identifier`]?.toString(), this.data[`${fieldPrefix}Text`]?.toString(), this.data[`${fieldPrefix}NameOfCodingSystem`]?.toString(), this.data.OriginalText?.toString());
                if (codeableConcept) {
                    fields.push(this.prepareField(codeableConcept));
                }
            });
        }
        return fields;
    }
}
