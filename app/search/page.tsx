// app/search/page.tsx  (Server Component)
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    mode?: string;
    from?: string;
    to?: string;
    dep?: string;
    ret?: string;
    pax?: string;
  }>;
}) {
  const params = await searchParams;

  const queryParams = {
    mode: params.mode || "",
    from: params.from || "",
    to: params.to || "",
    dep: params.dep || "",
    ret: params.ret || "",
    pax: params.pax ? parseInt(params.pax, 10) : 1,
  };

  const { from, to, dep, ret, pax } = queryParams;

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[60vh] bg-white rounded-2xl shadow-2xl z-10">
      <div className="p-5 font-semibold">From: {from}</div>
      <div className="p-5 font-semibold">To: {to}</div>
      <div className="p-5 font-semibold">Departure Date: {dep}</div>
      <div className="p-5 font-semibold">Return Date: {ret}</div>
      <div className="p-5 font-semibold">No. of Passengers: {pax}</div>
    </div>
  );
}
