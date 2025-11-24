import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  password: string;
  avatar?: string;
  stressLevel?: number;
  onboardingCompleted: boolean;
  kitScanned: boolean;
  kitCode?: string;
  createdAt: Date;
  updatedAt: Date;
  lastActive?: Date;

  // Métodos
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
      minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
      maxlength: [100, 'El nombre no puede exceder 100 caracteres'],
    },
    email: {
      type: String,
      required: [true, 'El email es requerido'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Proporciona un email válido',
      ],
    },
    phone: {
      type: String,
      required: [true, 'El teléfono es requerido'],
      trim: true,
      match: [/^[\d\s\+\-\(\)]+$/, 'Proporciona un número de teléfono válido'],
    },
    password: {
      type: String,
      required: [true, 'La contraseña es requerida'],
      minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
      select: false, // No incluir en queries por defecto
    },
    avatar: {
      type: String,
      default: null,
    },
    stressLevel: {
      type: Number,
      min: 1,
      max: 10,
      default: 5,
    },
    onboardingCompleted: {
      type: Boolean,
      default: false,
    },
    kitScanned: {
      type: Boolean,
      default: false,
    },
    kitCode: {
      type: String,
      sparse: true,
      unique: true,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret: any) {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Índices para mejorar performance
UserSchema.index({ email: 1 });
UserSchema.index({ kitCode: 1 });
UserSchema.index({ createdAt: -1 });

// Middleware: Hash password antes de guardar
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Método: Comparar contraseñas
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);

