import React, { useState, useEffect, useContext } from "react";
import { areSameAddress } from "../../../modules/ethereum/utils";
import { Grid } from "semantic-ui-react";
import Icon from "../../../images/grant_icon.svg";
import ButtonIcon from "../../../images/proposal_button_icon.svg";
import { Header, Button } from "decentraland-ui";
import { useIntl, FormattedMessage } from "react-intl";
import useResponsive from "../../../hooks/useResponsive";
import Responsive from "semantic-ui-react/dist/commonjs/addons/Responsive";
import { DaoInitiativeContext } from "../../../context/DaoInitiativeContext";
import { openInNewTab } from "../../../utils";

import "./Beneficiary.css";

function Beneficiary(props) {
  const { address } = props;

  const [proposals, setProposals] = useState(null);
  const [daoProposal, setDaoProposal] = useState(false);

  const responsive = useResponsive();
  const isMobile = responsive({ maxWidth: Responsive.onlyMobile.maxWidth });

  const intl = useIntl();

  const { daoButton, setDaoButton } = useContext(DaoInitiativeContext);

  useEffect(() => {
    fetch(process.env.REACT_APP_GRANT_PROPOSALS_API_URL)
      .then((resp) => resp.json())
      .then((resp) => setProposals(resp))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!!proposals) {
      let proposal = proposals.filter((p) => areSameAddress(p["vesting_address"], address));
      let proposalUrl = null;
      if (proposal.length === 1) {
        proposal = proposal[0];
        proposalUrl = new URL(process.env.REACT_APP_PROPOSALS_URL);
        proposalUrl.searchParams.append("id", proposal.id);
        setDaoProposal(true);
        setDaoButton(() => () => (
          <Button
            primary
            onClick={(e) => openInNewTab(e, proposalUrl)}
            href={proposalUrl}
            style={(isMobile && { padding: "10px" }) || {}}
          >
            <FormattedMessage id={isMobile ? "beneficiary.button.mobile" : "beneficiary.button"} />
            <img src={ButtonIcon} style={{ marginLeft: "8px" }} />
          </Button>
        ));
      } else {
        console.error(intl.formatMessage({ id: "error.dao_proposal_url" }));
      }
    }
  }, [proposals, address, isMobile]);

  return (
    daoProposal && (
      <div id="beneficiary">
        <Grid verticalAlign="middle">
          <Grid.Column className="beneficiaryContainer">
            <Grid.Column style={{ width: "fit-content" }}>
              <img src={Icon} style={{ marginTop: "5px" }} />
            </Grid.Column>
            <Grid.Column className="beneficiaryText" width={isMobile ? 12 : 9}>
              <Header>
                <FormattedMessage id="beneficiary.title" />
              </Header>
              <Header sub>
                <FormattedMessage id="beneficiary.subtitle" />
              </Header>
            </Grid.Column>
          </Grid.Column>
          <Grid.Column className={isMobile ? "hidden" : "button__column"} floated="right" textAlign="right">
            {daoButton()}
          </Grid.Column>
        </Grid>
      </div>
    )
  );
}

export default Beneficiary;
