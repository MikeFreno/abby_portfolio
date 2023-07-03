/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Row } from "~/types/db";
import { ConnectionFactory } from "../api/database/ConnectionFactory";

export default async function CommercialMainPage() {
  const conn = ConnectionFactory();
  const query = "SELECT * FROM Project WHERE Type = ?  AND Published = ?";
  const params = ["commercial", true]; // false is represented as 0 in MySQL
  const commercialResponse = await conn.execute(query, params);

  const commercialData = commercialResponse.rows as Row[];

  if (commercialData) {
    if (commercialData.length > 0)
      return (
        <div className="min-h-screen">
          <div className="">
            {commercialData.map((row) => (
              <div key={row.id}>
                <img
                  src={
                    row.Attachments?.split(",")[0]
                      ? row.Attachments?.split(",")[0]
                      : "/placeholder.jpg"
                  }
                />
              </div>
            ))}
          </div>
        </div>
      );
    else {
      return (
        <div className="h-screen w-screen flex flex-col justify-center">
          <div className="text-center">No commercial work posted yet!</div>
        </div>
      );
    }
  } else {
    return (
      <div className="h-screen w-screen flex flex-col justify-center">
        <div className="text-center">Critical Error retrieving data!</div>
      </div>
    );
  }
}
