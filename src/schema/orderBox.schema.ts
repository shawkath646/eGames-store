import * as yup from "yup";

const orderBoxSchema = yup.object().shape({
    productType: yup.string().required("Product type is a required field"),
    docId: yup.string().required("Doc ID is a required field"),
    packageId: yup.string().required("Package ID is a required field"),
    paymentMethod: yup.string().required("Payment method is a required field"),
    productName: yup.string().required("Product name is a required field"),
    details: yup.string().required("Details is a required field").min(10, "Details must be at least 10 characters").max(500, "Details cannot exceed 500 characters"),
    accountLast4Digit: yup.string().when('paymentMethod', (val) => {
        if (val[0] === "voucher") return yup.string().notRequired();
        return yup.string().required("Last 4 digits of account is a required field").length(4, "Account last 4 digits must be exactly 4.");
    }),
    transactionId: yup.string().when('paymentMethod', (val) => {
        if (val[0] === "voucher") return yup.string().notRequired();
        return yup.string().required("Transaction ID is a required field").min(3, "Transaction ID must be at least 3 characters").max(100, "Transaction ID cannot exceed 100 characters")
    }),
    voucherCode: yup.string().when('paymentMethod', (val) => {
        if (val[0] === "voucher") return yup.string().required("Voucher code is a required field").length(12, "Voucher code must be exactly 12 characters.");
        return yup.string().notRequired();
    }),
  });

export default orderBoxSchema;
