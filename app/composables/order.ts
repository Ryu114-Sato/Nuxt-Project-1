import { z } from "zod";

/*
Zod :
TypeScriptの型安全をサポートするためのバリデーションライブラリ
*/

const schema = z.string().min(5, "5文字以上の文字列を要求しています");

try {
  schema.parse("test"); // 失敗します
} catch (e) {
  console.error(e.errors); // エラー情報が出力されます
}

export const OrderInputSchema = z.object({
  firstName: z.string().min(1, "氏名は必須です"),
  lastName: z.string().min(1, "氏名は必須です"),
  phoneNumber: z.string().regex(/^[0-9]+$/, "数字とハイフンのみ"),
  // todoData:null
  postalCode: z
    .string()
    .regex(/^\d{3}-?\d{4}$/, "郵便局派123-4567形式で入力してください"),
  address1: z.string().min(1, "都道府県・市区町村入力してください"),
  address2: z.string().min(1, "番地を入力してください"),
  address3: z.string().min(1, "建物名・部屋番号を入力してください"),
  prefecture: z.string().min(1, "お支払い方法を選択してください"),
});

export type OrderInput = z.infer<typeof OrderInputSchema>;
