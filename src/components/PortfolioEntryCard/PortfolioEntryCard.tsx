import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { x } from "@xstyled/styled-components";
import pluralize from "pluralize";
import HistoryIcon from "@mui/icons-material/History";
import { PropsWithChildren, SyntheticEvent, useEffect, useRef, useState } from "react";
import format from "date-fns/format";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useInViewport } from "react-in-viewport";
import { useUserSettingsContext } from "../../context/UserSettingsContext";
import { useFormatNumber } from "../../hooks/useFormatNumber";
import { GroupedPortfolioEntry } from "../../models";
import { XStyledProps } from "../../types";
import { TickersToWebsites } from "../../const/constants";
import { Image } from "../Image/Image";

interface GroupedEntryProp {
  groupedEntry: GroupedPortfolioEntry;
}

function NumberOfShares({ groupedEntry }: GroupedEntryProp) {
  return (
    <x.span display="flex" alignItems="center">
      {groupedEntry.totalShares} {pluralize("share", groupedEntry.totalShares)}
    </x.span>
  );
}

interface TotalValueProps extends GroupedEntryProp {
  tickerToPriceMap: Map<string, number>;
}

function TotalValue({ groupedEntry, tickerToPriceMap }: TotalValueProps) {
  const getTickerPrice = () => tickerToPriceMap.get(groupedEntry.ticker);
  const formatNumber = useFormatNumber();
  const { baseCurrency } = useUserSettingsContext();

  return (
    <>
      {getTickerPrice() && (
        <x.span display="flex" alignItems="center" ml={2} color="emerald-600">
          {baseCurrency}
          {formatNumber(groupedEntry.totalShares * getTickerPrice())}
        </x.span>
      )}
    </>
  );
}

function RecentlyAddedDate({ groupedEntry }: GroupedEntryProp) {
  const [mostRecentDate, setMostRecentDate] = useState("");

  useEffect(() => {
    const sortedDates = groupedEntry.lastUpdated.map((dateString) => new Date(dateString)).sort();
    const mostRecentAddition = sortedDates && sortedDates.length && format(sortedDates[0], "MM/dd/yyyy");
    setMostRecentDate(mostRecentAddition);
  }, [groupedEntry]);

  return <>{mostRecentDate && <x.span fontSize="xs">Recently added: {mostRecentDate}</x.span>}</>;
}
interface PortfolioEntryCardProps {
  tickerToPriceMap: Map<string, number>;
  portfolioEntry: GroupedPortfolioEntry;
  onClickCard: (ticker: string) => void;
  onClickDelete: () => void;
}

interface HistoryProps extends GroupedEntryProp {
  onClickCard: (ticker: string) => void;
}
function History({ onClickCard, groupedEntry }: HistoryProps) {
  return (
    <x.span
      borderRadius={8}
      mr={2}
      bg={{ hover: "lightgray" }}
      cursor="pointer"
      onClick={() => onClickCard(groupedEntry.ticker)}
    >
      <HistoryIcon />
    </x.span>
  );
}

function CardRow({ children, ...props }: PropsWithChildren<XStyledProps>) {
  return (
    <x.div display="flex" justifyContent="space-between" {...props}>
      {children}
    </x.div>
  );
}

function Title({ groupedEntry }: GroupedEntryProp) {
  const navigate = useNavigate();
  return (
    <x.div>
      <x.span>
        {groupedEntry.ticker} - {groupedEntry.name}
      </x.span>
      <IconButton
        onClick={() => navigate(`/${groupedEntry.website}`)}
        size="small"
        edge="start"
        color="primary"
        sx={{ mr: 2 }}
      >
        <LaunchIcon />
      </IconButton>
    </x.div>
  );
}

export function PortfolioEntryCard({
  onClickCard,
  tickerToPriceMap,
  portfolioEntry: groupedEntry,
  onClickDelete,
}: PortfolioEntryCardProps) {
  const myRef = useRef();
  const { inViewport } = useInViewport(myRef);
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent sx={{ ":last-child": { paddingBottom: 2 } }}>
        <x.div display="flex" alignItems="center" ref={myRef}>
          <Image
            ticker={groupedEntry.ticker}
            inViewport={inViewport}
            src={`${TickersToWebsites[groupedEntry.ticker] || groupedEntry.website}`}
            height="16"
            width="16"
            mr={4}
          />
          <x.div flex={1}>
            <CardRow>
              <Title groupedEntry={groupedEntry} />
              <x.div display="flex">
                <History onClickCard={onClickCard} groupedEntry={groupedEntry} />
                <NumberOfShares groupedEntry={groupedEntry} />
              </x.div>
            </CardRow>
            <CardRow mt={1}>
              <RecentlyAddedDate groupedEntry={groupedEntry} />
              <TotalValue groupedEntry={groupedEntry} tickerToPriceMap={tickerToPriceMap} />
            </CardRow>
          </x.div>{" "}
          <x.span
            ml={4}
            onClick={(e: SyntheticEvent<HTMLSpanElement>) => {
              e.preventDefault();
              e.stopPropagation();
              onClickDelete();
            }}
            alignSelf="center"
            cursor="pointer"
          >
            <DeleteIcon color="error" />
          </x.span>
        </x.div>
      </CardContent>
    </Card>
  );
}
