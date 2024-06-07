import { PrepareField } from "./PrepareField";
import { XCN } from "@healthcare-interoperability/hl7v2-datatypes";
import { HL7v2MySQLUtils } from "@healthcare-interoperability/hl7v2-utils-mysql";

/**
 * Represents a class for preparing XCN fields for saving records.
 * Extends PrepareField class.
 */
export class PrepareXCNField extends PrepareField {
    /**
     * Constructs a new PrepareXCNField instance.
     * @param {string} field - The field name.
     * @param {XCN} data - The XCN data associated with the field.
     */
    constructor(field, data) {
        if (data instanceof XCN) {
            super(field, data);
        }
    }

    /**
     * Prepares the XCN field for saving records.
     * @returns {Object|null} The prepared field object or null if data is invalid.
     */
    prepare() {
        super.prepare();
        let field = null;

        if (this.data instanceof XCN) {
            let person_identifier = HL7v2MySQLUtils.validateString(this.data.IdNumber);
            let person_family_name = HL7v2MySQLUtils.validateFullName(this.data.FamilyName);
            let person_given_name = HL7v2MySQLUtils.validateString(this.data.GivenName);

            if (person_identifier || person_family_name || person_given_name) {
                field = this.prepareField({
                    person_identifier: person_identifier,
                    person_family_name: person_family_name,
                    person_given_name: person_given_name,
                    person_middle_name: HL7v2MySQLUtils.validateString(this.data.SecondAndFurtherGivenNamesOrInitialsThereof),
                    person_prefix: HL7v2MySQLUtils.validateString(this.data.Prefix),
                    person_suffix: HL7v2MySQLUtils.validateString(this.data.Suffix),
                    person_assigning_authority: HL7v2MySQLUtils.prepareComplexData(this.data.AssigningAuthority),
                    person_identifier_type_code: HL7v2MySQLUtils.prepareComplexData(this.data.IdentifierTypeCode),
                });
            }
        }
        return field;
    }
}
