// components/admin/analytics/TopPagesTable.jsx
const TopPagesTable = ({ pages }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <p className="text-xs text-gray-500 mb-3">Top pages</p>
      <div className="flex flex-col divide-y divide-gray-100">
        {pages.map((page) => (
          <div
            key={page.path}
            className="flex items-center justify-between py-2.5 text-sm"
          >
            <span className="text-gray-900 truncate max-w-[55%]">
              {page.path}
            </span>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-gray-500">{page.views} views</span>
              <span className="text-gray-400">{page.clicks} clicks</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPagesTable;
