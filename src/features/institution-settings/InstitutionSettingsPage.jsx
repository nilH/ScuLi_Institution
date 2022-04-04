import React,{useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import DashboardFeatureCard from "../../app/common/dashboard/DashboardFeatureCard";
import { openModal } from "../../app/common/modals/modalReducer";
import {getPolicies} from "./settingsAction";

export default function InstitutionSettingsPage() {
  const dispatch = useDispatch();
  const {academicAgreement,endUserAgreement}=useSelector((state)=>state.institution);
  useEffect(() => {
    dispatch(getPolicies());
    return () => {};
  }, [dispatch]);

  return (
    <div className="pagescontent">
      <Grid verticalAlign="middle" textAlign="center" container stackable>
        <Grid.Row>
          <Grid.Column width={4}>
            <DashboardFeatureCard
              title="Institution Logo"
              icon="address card"
              onClick={() =>
                dispatch(
                  openModal({
                    modalCategory: "EditSettingsModal",
                    modalProps: {
                      usecase: "instlogo",
                    },
                  })
                )
              }
              color="green"
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <DashboardFeatureCard
              title="Institution Cover Photo"
              icon="picture"
              onClick={() =>
                dispatch(
                  openModal({
                    modalCategory: "EditSettingsModal",
                    modalProps: {
                      usecase: "instcover",
                    },
                  })
                )
              }
              color="red"
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <DashboardFeatureCard
              title="Academic Integrity Policy"
              icon="graduation cap"
              onClick={() =>
                dispatch(
                  openModal({
                    modalCategory: "EditSettingsModal",
                    modalProps: {
                      usecase: "academicintegrity",
                      data:academicAgreement,
                    }
                  })
                )
              }
              color="blue"
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <DashboardFeatureCard
              title="End User Agreement"
              icon="handshake outline"
              onClick={() =>
                dispatch(
                  openModal({
                    modalCategory: "EditSettingsModal",
                    modalProps: {
                      usecase: "enduseragreement",
                      data:endUserAgreement,
                    },
                  })
                )
              }
              color="yellow"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
