import { Ruler } from "lucide-react";
import { sizeData } from "../../data/sizeData";

const SizeGuide = () => {
  return (
    <>
      <div className="bg-neutral-50 font-montserrat">
        {/* Header */}
        <div className="bg-neutral-900 text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-4">
              <Ruler className="w-8 h-8" />
              <h1 className="text-2xl md:text-4xl font-bold">Size Guide</h1>
            </div>
            <p className="text-neutral-300 text-md">
              To ensure the perfect fit, please refer to our size guide before
              placing an order
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="bg-white p-6 md:p-8 shadow-sm">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-neutral-900">
                    <th className="text-left py-4 px-4 font-bold text-neutral-900">
                      Size
                    </th>
                    <th className="text-left py-4 px-4 font-bold text-neutral-900">
                      Chest (inches)
                    </th>
                    <th className="text-left py-4 px-4 font-bold text-neutral-900">
                      Waist (inches)
                    </th>
                    <th className="text-left py-4 px-4 font-bold text-neutral-900">
                      Hip (inches)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sizeData.map((item, index) => (
                    <tr
                      key={item.size}
                      className={`border-b border-neutral-200 ${
                        index % 2 === 0 ? "bg-neutral-50" : ""
                      }`}
                    >
                      <td className="py-4 px-4 font-semibold text-neutral-900">
                        {item.size}
                      </td>
                      <td className="py-4 px-4 text-neutral-600">
                        {item.chest}
                      </td>
                      <td className="py-4 px-4 text-neutral-600">
                        {item.waist}
                      </td>
                      <td className="py-4 px-4 text-neutral-600">{item.hip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {sizeData.map((item) => (
                <div
                  key={item.size}
                  className="border border-neutral-200 p-4"
                >
                  <div className="text-xl font-bold text-neutral-900 mb-4">
                    Size {item.size}
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-neutral-700">
                        Chest:
                      </span>
                      <span className="text-neutral-600">{item.chest}"</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-neutral-700">
                        Waist:
                      </span>
                      <span className="text-neutral-600">{item.waist}"</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-neutral-700">
                        Hip:
                      </span>
                      <span className="text-neutral-600">{item.hip}"</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Note */}
            <div className="mt-8 p-4 bg-amber-50 border border-amber-200">
              <p className="text-sm text-neutral-600">
                <strong>Note:</strong> Sizes may vary slightly depending on
                design and fabric.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SizeGuide;
