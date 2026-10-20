import { z } from "zod";

export const checkoutSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your full name")
    .max(80, "That name is too long"),
  phone: z
    .string()
    .min(9, "Enter a reachable phone number")
    .max(16, "That phone number is too long")
    .regex(/^(\+?254|0)[17]\d{8}$/, "Use a Kenyan number, for example 0712 345 678"),
  email: z.union([z.string().email("Enter a valid email"), z.literal("")]).optional(),
  address: z.string().min(8, "Add a building, street and estate"),
  town: z.string().min(2, "Which town or estate?"),
  zone: z.string().min(2, "Choose a delivery zone"),
  deliveryDate: z.string().min(4, "Choose a preferred delivery date"),
  assembly: z.boolean(),
  instructions: z.string().max(500, "Keep instructions under 500 characters").optional(),
  payment: z.enum(["mpesa", "card"], {
    message: "Choose M-Pesa or card",
  }),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export const signupSchema = z
  .object({
    name: z.string().min(2, "Tell us your name"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Use at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupInput = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z.string().email("Enter the email you signed up with"),
  password: z.string().min(8, "Enter your password"),
});

export type SigninInput = z.infer<typeof signinSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Tell us your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().max(16).optional(),
  subject: z.string().min(3, "Add a short subject"),
  message: z.string().min(10, "Tell us a little more"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const cartAddSchema = z.object({
  productId: z.string().min(1, "Choose a product"),
  quantity: z.number().int().min(1).max(10).default(1),
  colourOption: z.string().min(1).default("Default"),
});

export type CartAddInput = z.infer<typeof cartAddSchema>;

const orderItemSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  price: z.number().int().nonnegative(),
  quantity: z.number().int().min(1).max(10),
  colour: z.string().min(1),
  image: z.string().min(1),
});

export const orderCreateSchema = z.object({
  customer: checkoutSchema,
  items: z.array(orderItemSchema).min(1, "Your cart is empty"),
  recaptchaToken: z.string().optional(),
  recaptchaV2Token: z.string().optional(),
});

export type OrderCreateInput = z.infer<typeof orderCreateSchema>;
