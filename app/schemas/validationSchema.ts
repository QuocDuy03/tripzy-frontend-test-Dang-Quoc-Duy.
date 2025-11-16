import * as yup from "yup";
import { IFormInputs, ILocation } from "../types";

export const validationSchema: yup.ObjectSchema<IFormInputs> = yup.object({
  from: yup
    .object<ILocation>()
    .shape({
      short_code: yup.string().required(),
      english_name: yup.string().required(),
      code_state: yup.string().required(),
    })
    .required("From is required"),
  to: yup
    .object<ILocation>()
    .shape({
      short_code: yup.string().required(),
      english_name: yup.string().required(),
      code_state: yup.string().required(),
    })
    .required("To is required"),
  departureDate: yup
    .string()
    .required("Departure date is required")
    .test("valid-departure-date", "Invalid departure date", (value) => {
      if (!value) return false;
      return new Date(value) > new Date();
    }),
  returnDate: yup
    .string()
    .nullable()
    .default(null)
    .transform((v) => v ?? null)
    .test(
      "return-date-valid",
      "Return date must be after departure date",
      function (value) {
        const { isRoundTrip, departureDate } = this.parent;
        if (!isRoundTrip) return true; // Không round trip → bỏ qua
        if (!value) return false; // Bắt buộc có returnDate
        return new Date(value) >= new Date(departureDate);
      }
    ),
  isRoundTrip: yup.boolean().default(false),
  passengers: yup
    .number()
    .required("Number of passengers is required")
    .min(1, "Minimum 1 passenger")
    .max(9, "Maximum 9 passengers"),
});
