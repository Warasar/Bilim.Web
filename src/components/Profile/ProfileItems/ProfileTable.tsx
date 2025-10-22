import React, { useEffect, useState } from "react";
import { requestGet } from "../../../actions/actions";
import DataGrid from "../../../modules/YaKIT.WEB.KIT/components/DataGrid/DataGrid";
import Export from "../../../modules/YaKIT.WEB.KIT/components/DataGrid/Export/Export";
import Column from "../../../modules/YaKIT.WEB.KIT/components/DataGrid/Column/Column";
import FilterRow from "../../../modules/YaKIT.WEB.KIT/components/DataGrid/FilterRow/FilterRow";
import HeaderFilter from "../../../modules/YaKIT.WEB.KIT/components/DataGrid/HeaderFilter/HeaderFilter";

type Props = {
  setLoader: (loader: boolean) => void;
  tableItem: any;
};

export default function ProfileTable({ setLoader, tableItem }: Props) {
  const [tableData, setTableData] = useState<any>(null);
  const [tableColumns, setTableColumns] = useState<any>(null);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableItem]);

  const getData = async () => {
    setLoader(true);

    const table: any = await requestGet(`admin/table?id=${tableItem.id}`);

    setTableData(table?.data);
    setTableColumns(table?.fields);
    setLoader(false);
  };

  return tableColumns && tableData ? (
    <div className="profile-table">
      <DataGrid dataSource={tableData}>
        <Export fileName={tableItem.tableTitle} />
        <FilterRow visible={true} />
        <HeaderFilter visible={true} />
        {tableColumns.map((column: any) => {
          return <Column dataField={column.field} caption={column.fieldName} />;
        })}
      </DataGrid>
    </div>
  ) : null;
}
