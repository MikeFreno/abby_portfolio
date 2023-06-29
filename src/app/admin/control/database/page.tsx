import { DeleteTable, InitDatabase } from "./actions";

export default function DatabasePage() {
  return (
    <div className="h-screen w-full flex justify-center align-middle">
      <div>
        <div className="text-2xl text-center py-8">Database Control</div>
        <form action={InitDatabase}>
          <div className="input-group">
            <input
              type="text"
              required
              className="bg-transparent underlinedInput"
              name="tableName"
              placeholder=" "
            />
            <span className="bar"></span>
            <label className="underlinedInputLabel">Table Name</label>
          </div>
          <div className="input-group">
            <input
              type="text"
              required
              className="bg-transparent underlinedInput"
              name="password"
              placeholder=" "
            />
            <span className="bar"></span>
            <label className="underlinedInputLabel">DB Command Password</label>
          </div>
          <div className="flex justify-end py-4">
            <button className="rounded border text-white shadow-md border-emerald-500 bg-emerald-400 hover:bg-emerald-500 active:scale-90 transition-all duration-300 ease-in-out px-4 py-2">
              Init Table
            </button>
          </div>
        </form>
        <form action={DeleteTable}>
          <div className="input-group">
            <input
              type="text"
              required
              className="bg-transparent underlinedInput"
              name="tableName"
              placeholder=" "
            />
            <span className="bar"></span>
            <label className="underlinedInputLabel">Table Name</label>
          </div>
          <div className="input-group">
            <input
              type="text"
              required
              className="bg-transparent underlinedInput"
              name="password"
              placeholder=" "
            />
            <span className="bar"></span>
            <label className="underlinedInputLabel">DB Command Password</label>
          </div>
          <div className="flex justify-end py-4">
            <button className="rounded border text-white shadow-md border-emerald-500 bg-emerald-400 hover:bg-emerald-500 active:scale-90 transition-all duration-300 ease-in-out px-4 py-2">
              Drop Table
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
