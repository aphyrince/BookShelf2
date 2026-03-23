const TableHeader = ({ isAdmin }: { isAdmin: boolean }) => {
    return (
        <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b border-slate-100 dark:border-slate-800">
            <tr>
                <th className="p-5 w-[30%]">Item Information</th>
                <th className="p-5 w-[15%] text-center">Category</th>
                <th className="p-5 w-[15%] text-center">Status</th>
                <th className="p-5 w-[20%]">Read History</th>
                <th className="p-5 w-[20%]">Feedback</th>
                {isAdmin && <th className="p-5 w-15"></th>}
            </tr>
        </thead>
    );
};

export default TableHeader;
