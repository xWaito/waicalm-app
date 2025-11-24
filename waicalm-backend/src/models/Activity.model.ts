import mongoose, { Schema, Document } from 'mongoose';

export type ActivityType = 'breathing' | 'journal' | 'gummies' | 'rollon';

export interface IActivity extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  activityType: ActivityType;
  duration?: number; // Duración en minutos (solo para breathing/journal)
  notes?: string;
  mood?: number; // 1-5 rating
  completedAt: Date;
  createdAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'El usuario es requerido'],
      index: true,
    },
    activityType: {
      type: String,
      enum: {
        values: ['breathing', 'journal', 'gummies', 'rollon'],
        message: '{VALUE} no es un tipo de actividad válido',
      },
      required: [true, 'El tipo de actividad es requerido'],
    },
    duration: {
      type: Number,
      min: 0,
      max: 60,
    },
    notes: {
      type: String,
      maxlength: 500,
    },
    mood: {
      type: Number,
      min: 1,
      max: 5,
    },
    completedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret: any) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Índices compuestos para queries optimizadas
ActivitySchema.index({ userId: 1, completedAt: -1 });
ActivitySchema.index({ userId: 1, activityType: 1, completedAt: -1 });
ActivitySchema.index({ completedAt: -1 });

export default mongoose.model<IActivity>('Activity', ActivitySchema);

