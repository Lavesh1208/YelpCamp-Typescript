import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import config from 'config';
import jwt from 'jsonwebtoken';
import { IUserDocument } from '../interfaces/user.interface';
const Schema = mongoose.Schema;

const userSchema = new Schema(
   {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      resetPasswordToken: String,
      resetPasswordExpires: Date,
   },
   {
      timestamps: true,
   }
);

userSchema.pre('save', async function (next) {
   let user = this as IUserDocument;
   if (!user.isModified('password')) {
      return next();
   }

   const saltWorkFactor = config.get<number>('saltWorkFactor');
   const salt = await bcryptjs.genSalt(Number(saltWorkFactor));

   const hash = await bcryptjs.hash(user.password, salt);

   user.password = hash;
   return next();
});

userSchema.methods.getJWTToken = function () {
   return jwt.sign(
      {
         _id: this._id,
         name: this.name,
         email: this.email,
         resetPasswordToken: this.resetPasswordToken,
         resetPasswordExpires: this.resetPasswordExpires,
      },
      config.get<string>('jwtsecret'),
      {
         expiresIn: 60 * 60 * 24 * 7,
      }
   );
};

userSchema.methods.comparePassword = async function (
   candidatePassword: string
): Promise<boolean> {
   const user = this as IUserDocument;

   return await bcryptjs
      .compare(candidatePassword, user.password)
      .catch((e) => false);
};

const User = mongoose.model<IUserDocument>('User', userSchema);

export default User;
