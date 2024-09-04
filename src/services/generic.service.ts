import express from "express";
import { Document, Model, ObjectId } from "mongoose";
import { response, serverError } from "../utils/common";
import * as mongoose from "mongoose";

export class GenericService<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: any) {
    return this.model.create(data);
  }

  async getAll() {
    return this.model.find();
  }

  async getById(
    id: mongoose.Types.ObjectId,
    projection: Object = {},
    options: Object = {}
  ) {
    return this.model.findById(id, projection, options);
  }

  async updateOne(id: mongoose.Types.ObjectId, data: any) {
    return this.model.updateOne(id, data);
  }

  async findByIdAndUpdate(
    id: mongoose.Types.ObjectId,
    data: any,
    options: Object = {}
  ) {
    return this.model.findByIdAndUpdate(id, data, { ...options, new: true });
  }

  async delete(id: mongoose.Types.ObjectId) {
    return this.model.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    );
  }

  async countDocuments(query: Object = {}) {
    return this.model.countDocuments(query);
  }
}
