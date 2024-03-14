import mongoose, { Schema } from "mongoose";

/* connect to DB */
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise - global.Promise;

/* Screma */
const ticketSchema = new Schema(
  {
    title: String,
    body: String,
    priority: String,
    user_email: String,
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);
export default Ticket;
