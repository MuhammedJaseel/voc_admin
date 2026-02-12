import { useEffect, useState } from "react";
import { IC } from "../components/librery";
import { Paging } from "../components/paging";
import { useSelector } from "react-redux";
import { setCustomers } from "../redux/store";
import { loadEnquires, updateEnquiryStatus } from "../services/dashboard";
import { formatDate } from "../services/simple";

export default function EnquiresPage() {
  const [search, setsearch] = useState("");

  const result = useSelector((state: any) => state.data.contactUs);
  const { total, page, data, busy } = result;

  useEffect(() => {
    _loadDatas(page, "");
  }, []);

  const _loadDatas = async (page_: number, search_: string) => {
    await loadEnquires(page_, search_);
  };

  const _changePage = (a1: any) => {
    setCustomers({ total, page: a1, data: [], busy: true });
    _loadDatas(a1, search);
  };

  const _search = (e: any) => {
    const value = e.target.value;
    setsearch(value);
    if (value.length > 2) _loadDatas(1, value);
    else if (value.length === 0) _loadDatas(1, "");
  };

  const onChangeStatus = async (item: any, value: string) => {
    updateEnquiryStatus(item._id, value);
    _loadDatas(page, search);
  };

  const elSt =
    "px-5 py-3 flex items-center border-r border-[#16263B] last:border-0 overflow-hidden ";

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <div className="text-xl">
          <span className="text-[#4F8FE1] font-bold ">Enquires</span>{" "}
          ({total})
        </div>
      </div>
      <div className="bg-[#010513] border-1 border-[#010513] mt-6 rounded-[16px] overflow-hidden">
        <div className="bg-[#011022] rounded-t-[16px] p-5 flex gap-3 items-center border-b border-[#16263B] text-sm">
          <input
            placeholder="Search by using email, or phone"
            className="border border-[#16263B] rounded-lg py-2 px-4 w-92 bg-[#0F1626]"
            style={{ backgroundImage: `url('${IC.lens}')` }}
            onChange={_search}
          />
          {/* <select
            className="border border-[#16263B] rounded-lg py-2 px-4 w-50 bg-[#0E1C2F]"
            id="search"
          >
            <option>All Status</option>
          </select> */}
        </div>
        <div className="flex text-[14px] px-2">
          <div className={elSt + "py-5 w-[40%]"}>Name</div>
          <div className={elSt + "py-5 w-[34%]"}>Email</div>
          <div className={elSt + "py-5 w-[26%]"}>Created At</div>
          <div className={elSt + "py-5 w-[20%] justify-center"}>Status</div>
          <div className={elSt + "py-5 w-[20%] justify-center"}>Action</div>
        </div>
        {busy && <div className="text-center text-sm p-4">Loading...</div>}
        {total < 1 && <div className="text-center text-sm p-4">No Data</div>}
        {data.map((_it: any, k: number) => (
          <div className="flex odd:bg-[#0a101d] px-2" key={k}>
            <div className={elSt + "w-[40%]"}>{_it.name}</div>
            <div className={elSt + "w-[34%]"}>
              <div>{_it.email}</div>
              <div>{_it.phone}</div>
            </div>
            <div className={elSt + "w-[26%]"}>{formatDate(_it.createdAt)}</div>
            <div className={elSt + "w-[20%] justify-center text-sm"}>
              <select
                onChange={(e) => onChangeStatus(_it, e.target.value)}
                defaultValue={_it.status}
              >
                <option value="NEW">New</option>
                <option value="SEEN">Seen</option>
                <option value="DONE">Done</option>
              </select>
            </div>
            <div className={elSt + "w-[20%] justify-center"}>
              {/* <div className="bg-[#4F8FE11A] border border-[#4F8FE14D] w-8 h-8 rounded cursor-pointer flex">
                <img src={IC.edit} className="min-w-2 min-h-2 p-[5px]" />
              </div> */}
            </div>
          </div>
        ))}
      </div>
      <Paging total={total} page={page} reload={_changePage} />
    </div>
  );
}
