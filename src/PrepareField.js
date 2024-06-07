/**
 * Represents a class for preparing fields for saving records.
 */
export class PrepareField {
    /**
     * Constructs a new PrepareField instance.
     * @param {string} field - The field name.
     * @param {*} data - The data associated with the field.
     * @throws {Error} If field name is missing.
     */
    constructor(field, data) {
        if (field) {
            this.field = field;
            this.data = data;
            this.sid = 1;
            this.entryCount = 1;
            this.groupId = 1;
        } else {
            throw new Error(`Field name is missing. Please provide a valid field name.`);
        }
    }

    /**
     * Sets the message ID.
     * @param {string} messageId - The message ID to set.
     */
    setMessageId(messageId) {
        this.messageId = messageId;
        return this;
    }

    /**
     * Sets the SID (System Identifier).
     * @param {string} sid - The SID to set.
     */
    setSID(sid) {
        this.sid = sid;
        return this;
    }


    setGroupId(groupId) {
        this.groupId = groupId;
        return this;
    }


    setEntryCount(entryCount) {
        this.entryCount = entryCount;
        return this;
    }

    /**
     * Sets the segment.
     * @param {string} segment - The segment to set.
     */
    setSegment(segment) {
        this.segment = segment;
        return this;
    }

    prepareField(data) {
        return {
            msg_id: this.messageId,
            msg_segment: this.segment,
            msg_sid: this.sid,
            msg_group_count: this.groupId,
            msg_entry_count: this.entryCount,
            msg_field_type: this.field,
            ...data
        };
    }

    /**
     * Prepares the field for saving records.
     * @throws {Error} If message ID or segment data is missing.
     */
    prepare() {
        if (!this.messageId) {
            throw new Error(`Message ID is required for saving the record. Please set the message ID before preparing.`);
        }
        if (!this.segment) {
            throw new Error(`Segment data is missing. Please set the segment data before preparing.`);
        }
    }
}
