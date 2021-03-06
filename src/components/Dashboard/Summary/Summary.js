import "./Summary.css";
import React from "react";
import { getMonthDiff } from "../../../utils";
import { FormattedDate, FormattedMessage, FormattedNumber, FormattedPlural } from "react-intl";
import useReviewUrl from "../../../hooks/useReviewUrl";

function Summary(props) {
  const { address, contract, ticker } = props;
  const { symbol, released, balance, start, cliff, vestedAmount } = contract;
  const percentage = Math.round((released / vestedAmount) * 100);
  const total = balance + released;
  const vestingCliff = getMonthDiff(start, cliff);

  const [reviewUrl, handleClick] = useReviewUrl(address);

  return (
    <div id="summary" style={{ textAlign: "justify" }}>
      <FormattedMessage
        id="summary.text"
        values={{
          b: (chunks) => <b>{chunks}</b>,
          br: <br />,
          cliff: vestingCliff,
          monthPl: (
            <FormattedPlural
              value={vestingCliff}
              one={<FormattedMessage id="global.month" />}
              other={<FormattedMessage id="global.month.plural" />}
            />
          ),
          cliffEnd: <FormattedDate value={new Date(cliff * 1000)} year="numeric" month="long" day="numeric" />,
          percentage: <FormattedNumber value={percentage} />,
          amount: <FormattedNumber value={symbol === "MANA" ? total * ticker : total} />,
        }}
      />
      <a href={reviewUrl} onClick={handleClick}>
        <FormattedMessage id="summary.review_contract" />
      </a>
    </div>
  );
}

export default React.memo(Summary);
