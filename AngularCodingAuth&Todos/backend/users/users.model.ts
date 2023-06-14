import { Schema, model, InferSchemaType } from 'mongoose';

const schema = new Schema({
    fullname: String,
    email: { type: String, require: true, unique: true },
    password: String,
    pictures: { type: Array<{ url: string }>, require: false }
})

export type IUser = InferSchemaType<typeof schema>;

export default model<IUser>('user', schema)