import { useMemo } from "react";
import {
  HvFlowNode,
  HvFlowNodeFC,
  HvFlowNodeProps,
  useFlowInputNodes,
} from "@hitachivantara/uikit-react-lab";

import { NodeData } from "../types";

export const BarChart: HvFlowNodeFC<NodeData> = (props) => {
  const inputNodes = useFlowInputNodes<NodeData>();

  const params: HvFlowNodeProps["params"] = useMemo(() => {
    const columns = inputNodes[0]?.data.columns;

    return columns
      ? [
          { label: "Title", id: "title", type: "text" },
          {
            label: "Measure",
            id: "measure",
            type: "select",
            options: columns,
            multiple: true,
          },
          {
            label: "Group by",
            id: "groupBy",
            type: "select",
            options: columns,
            multiple: true,
          },
          {
            label: "Split by",
            id: "splitBy",
            type: "select",
            options: columns,
            multiple: true,
          },
        ]
      : undefined;
  }, [inputNodes]);

  return (
    <HvFlowNode
      description="Bar Chart"
      groupId="visualization"
      groupItem="barChart"
      params={params}
      expanded
      inputs={[
        {
          label: "Dataset",
          isMandatory: true,
          accepts: ["dataset"],
          maxConnections: 1,
        },
      ]}
      outputs={[
        {
          label: "Visualization",
          isMandatory: true,
          provides: "visualizations",
        },
      ]}
      {...props}
    />
  );
};
