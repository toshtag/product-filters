import { XCircle } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="relative col-span-full h-80 bg-gray-50 w-full p-12 flex flex-col items-center justify-center">
      <XCircle className="h-8 w-8 text-red-500" />
      <h3 className="font-semibold text-xl">商品が見つかりません</h3>
      <p className="text-zinc-500 text-sm">
        この絞り込みにおける検索結果は見つかりませんでした。
      </p>
    </div>
  );
};

export default EmptyState;
