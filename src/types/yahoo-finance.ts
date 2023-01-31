export namespace YF {
  export interface Pre {
    timezone: string;
    end: number;
    start: number;
    gmtoffset: number;
  }

  export interface Regular {
    timezone: string;
    end: number;
    start: number;
    gmtoffset: number;
  }

  export interface Post {
    timezone: string;
    end: number;
    start: number;
    gmtoffset: number;
  }

  export interface CurrentTradingPeriod {
    pre: Pre;
    regular: Regular;
    post: Post;
  }

  export interface Meta {
    currency: string;
    symbol: string;
    exchangeName: string;
    instrumentType: string;
    firstTradeDate: number;
    regularMarketTime: number;
    gmtoffset: number;
    timezone: string;
    exchangeTimezoneName: string;
    regularMarketPrice: number;
    chartPreviousClose: number;
    previousClose: number;
    scale: number;
    priceHint: number;
    currentTradingPeriod: CurrentTradingPeriod;
    tradingPeriods: any[][];
    dataGranularity: string;
    range: string;
    validRanges: string[];
  }

  export interface Quote {
    open: number[];
    volume: number[];
    high: number[];
    close: number[];
    low: number[];
  }

  export interface Indicators {
    quote: [Quote];
  }

  export interface Result {
    meta: Meta;
    timestamp: number[];
    indicators: Indicators;
  }

  export interface Chart {
    result: [Result];
  }

  export interface PriceHistoryResponse {
    chart: Chart;
  }
}

export namespace YFModule {
  export interface TotalPay {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface ExercisedValue {
    raw: number;
    fmt?: any;
    longFmt: string;
  }

  export interface UnexercisedValue {
    raw: number;
    fmt?: any;
    longFmt: string;
  }

  export interface CompanyOfficer {
    maxAge: number;
    name: string;
    age: number;
    title: string;
    yearBorn: number;
    fiscalYear: number;
    totalPay: TotalPay;
    exercisedValue: ExercisedValue;
    unexercisedValue: UnexercisedValue;
  }

  export interface AssetProfile {
    address1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
    website: string;
    industry: string;
    sector: string;
    longBusinessSummary: string;
    fullTimeEmployees: number;
    companyOfficers: CompanyOfficer[];
    auditRisk: number;
    boardRisk: number;
    compensationRisk: number;
    shareHolderRightsRisk: number;
    overallRisk: number;
    governanceEpochDate: number;
    compensationAsOfEpochDate: number;
    maxAge: number;
  }

  export interface Trend {
    period: string;
    strongBuy: number;
    buy: number;
    hold: number;
    sell: number;
    strongSell: number;
  }

  export interface RecommendationTrend {
    trend: Trend[];
    maxAge: number;
  }

  export interface EndDate {
    raw: number;
    fmt: string;
  }

  export interface NetIncome {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface Depreciation {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface ChangeToNetincome {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface ChangeToAccountReceivables {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface ChangeToLiabilities {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface ChangeToInventory {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface ChangeToOperatingActivities {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface TotalCashFromOperatingActivities {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface CapitalExpenditures {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface Investments {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface OtherCashflowsFromInvestingActivities {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface TotalCashflowsFromInvestingActivities {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface DividendsPaid {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface NetBorrowings {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface OtherCashflowsFromFinancingActivities {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface TotalCashFromFinancingActivities {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface ChangeInCash {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface RepurchaseOfStock {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface IssuanceOfStock {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface CashflowStatement {
    maxAge: number;
    endDate: EndDate;
    netIncome: NetIncome;
    depreciation: Depreciation;
    changeToNetincome: ChangeToNetincome;
    changeToAccountReceivables: ChangeToAccountReceivables;
    changeToLiabilities: ChangeToLiabilities;
    changeToInventory: ChangeToInventory;
    changeToOperatingActivities: ChangeToOperatingActivities;
    totalCashFromOperatingActivities: TotalCashFromOperatingActivities;
    capitalExpenditures: CapitalExpenditures;
    investments: Investments;
    otherCashflowsFromInvestingActivities: OtherCashflowsFromInvestingActivities;
    totalCashflowsFromInvestingActivities: TotalCashflowsFromInvestingActivities;
    dividendsPaid: DividendsPaid;
    netBorrowings: NetBorrowings;
    otherCashflowsFromFinancingActivities: OtherCashflowsFromFinancingActivities;
    totalCashFromFinancingActivities: TotalCashFromFinancingActivities;
    changeInCash: ChangeInCash;
    repurchaseOfStock: RepurchaseOfStock;
    issuanceOfStock: IssuanceOfStock;
  }

  export interface CashflowStatementHistory {
    cashflowStatements: CashflowStatement[];
    maxAge: number;
  }

  export interface PeRatio {
    raw: number;
    fmt: string;
  }

  export interface PegRatio {
    raw: number;
    fmt: string;
  }

  export interface Growth {
    raw: number;
    fmt: string;
  }

  export interface Estimate {
    period: string;
    growth: Growth;
  }

  export interface IndexTrend {
    maxAge: number;
    symbol: string;
    peRatio: PeRatio;
    pegRatio: PegRatio;
    estimates: Estimate[];
  }

  export interface PriceHint {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface EnterpriseValue {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface ForwardPE {
    raw: number;
    fmt: string;
  }

  export interface ProfitMargins {
    raw: number;
    fmt: string;
  }

  export interface FloatShares {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface SharesOutstanding {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface SharesShort {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface SharesShortPriorMonth {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface SharesShortPreviousMonthDate {
    raw: number;
    fmt: string;
  }

  export interface DateShortInterest {
    raw: number;
    fmt: string;
  }

  export interface SharesPercentSharesOut {
    raw: number;
    fmt: string;
  }

  export interface HeldPercentInsiders {
    raw: number;
    fmt: string;
  }

  export interface HeldPercentInstitutions {
    raw: number;
    fmt: string;
  }

  export interface ShortRatio {
    raw: number;
    fmt: string;
  }

  export interface ShortPercentOfFloat {
    raw: number;
    fmt: string;
  }

  export interface Beta {
    raw: number;
    fmt: string;
  }

  export interface ImpliedSharesOutstanding {
    raw: number;
    fmt?: any;
    longFmt: string;
  }

  export interface MorningStarOverallRating {}

  export interface MorningStarRiskRating {}

  export interface BookValue {
    raw: number;
    fmt: string;
  }

  export interface PriceToBook {
    raw: number;
    fmt: string;
  }

  export interface AnnualReportExpenseRatio {}

  export interface YtdReturn {}

  export interface Beta3Year {}

  export interface TotalAssets {}

  export interface Yield {}

  export interface FundInceptionDate {}

  export interface ThreeYearAverageReturn {}

  export interface FiveYearAverageReturn {}

  export interface PriceToSalesTrailing12Months {}

  export interface LastFiscalYearEnd {
    raw: number;
    fmt: string;
  }

  export interface NextFiscalYearEnd {
    raw: number;
    fmt: string;
  }

  export interface MostRecentQuarter {
    raw: number;
    fmt: string;
  }

  export interface EarningsQuarterlyGrowth {
    raw: number;
    fmt: string;
  }

  export interface RevenueQuarterlyGrowth {}

  export interface NetIncomeToCommon {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface TrailingEps {
    raw: number;
    fmt: string;
  }

  export interface ForwardEps {
    raw: number;
    fmt: string;
  }

  export interface PegRatio2 {
    raw: number;
    fmt: string;
  }

  export interface LastSplitDate {
    raw: number;
    fmt: string;
  }

  export interface EnterpriseToRevenue {
    raw: number;
    fmt: string;
  }

  export interface EnterpriseToEbitda {
    raw: number;
    fmt: string;
  }

  export interface FiftyTwoWeekChange {
    raw: number;
    fmt: string;
  }

  export interface SandP52WeekChange {
    raw: number;
    fmt: string;
  }

  export interface LastDividendValue {
    raw: number;
    fmt: string;
  }

  export interface LastDividendDate {
    raw: number;
    fmt: string;
  }

  export interface LastCapGain {}

  export interface AnnualHoldingsTurnover {}

  export interface DefaultKeyStatistics {
    maxAge: number;
    priceHint: PriceHint;
    enterpriseValue: EnterpriseValue;
    forwardPE: ForwardPE;
    profitMargins: ProfitMargins;
    floatShares: FloatShares;
    sharesOutstanding: SharesOutstanding;
    sharesShort: SharesShort;
    sharesShortPriorMonth: SharesShortPriorMonth;
    sharesShortPreviousMonthDate: SharesShortPreviousMonthDate;
    dateShortInterest: DateShortInterest;
    sharesPercentSharesOut: SharesPercentSharesOut;
    heldPercentInsiders: HeldPercentInsiders;
    heldPercentInstitutions: HeldPercentInstitutions;
    shortRatio: ShortRatio;
    shortPercentOfFloat: ShortPercentOfFloat;
    beta: Beta;
    impliedSharesOutstanding: ImpliedSharesOutstanding;
    morningStarOverallRating: MorningStarOverallRating;
    morningStarRiskRating: MorningStarRiskRating;
    category?: any;
    bookValue: BookValue;
    priceToBook: PriceToBook;
    annualReportExpenseRatio: AnnualReportExpenseRatio;
    ytdReturn: YtdReturn;
    beta3Year: Beta3Year;
    totalAssets: TotalAssets;
    yield: Yield;
    fundFamily?: any;
    fundInceptionDate: FundInceptionDate;
    legalType?: any;
    threeYearAverageReturn: ThreeYearAverageReturn;
    fiveYearAverageReturn: FiveYearAverageReturn;
    priceToSalesTrailing12Months: PriceToSalesTrailing12Months;
    lastFiscalYearEnd: LastFiscalYearEnd;
    nextFiscalYearEnd: NextFiscalYearEnd;
    mostRecentQuarter: MostRecentQuarter;
    earningsQuarterlyGrowth: EarningsQuarterlyGrowth;
    revenueQuarterlyGrowth: RevenueQuarterlyGrowth;
    netIncomeToCommon: NetIncomeToCommon;
    trailingEps: TrailingEps;
    forwardEps: ForwardEps;
    pegRatio: PegRatio2;
    lastSplitFactor: string;
    lastSplitDate: LastSplitDate;
    enterpriseToRevenue: EnterpriseToRevenue;
    enterpriseToEbitda: EnterpriseToEbitda;
    "52WeekChange": FiftyTwoWeekChange;
    SandP52WeekChange: SandP52WeekChange;
    lastDividendValue: LastDividendValue;
    lastDividendDate: LastDividendDate;
    lastCapGain: LastCapGain;
    annualHoldingsTurnover: AnnualHoldingsTurnover;
  }

  export interface PeRatio2 {}

  export interface PegRatio3 {}

  export interface IndustryTrend {
    maxAge: number;
    symbol?: any;
    peRatio: PeRatio2;
    pegRatio: PegRatio3;
    estimates: any[];
  }

  export interface EndDate2 {
    raw: number;
    fmt: string;
  }

  export interface TotalRevenue {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface CostOfRevenue {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface GrossProfit {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface ResearchDevelopment {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface SellingGeneralAdministrative {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface NonRecurring {}

  export interface OtherOperatingExpenses {}

  export interface TotalOperatingExpenses {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface OperatingIncome {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface TotalOtherIncomeExpenseNet {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface Ebit {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface InterestExpense {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface IncomeBeforeTax {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface IncomeTaxExpense {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface MinorityInterest {}

  export interface NetIncomeFromContinuingOps {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface DiscontinuedOperations {}

  export interface ExtraordinaryItems {}

  export interface EffectOfAccountingCharges {}

  export interface OtherItems {}

  export interface NetIncome2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface NetIncomeApplicableToCommonShares {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface IncomeStatementHistory2 {
    maxAge: number;
    endDate: EndDate2;
    totalRevenue: TotalRevenue;
    costOfRevenue: CostOfRevenue;
    grossProfit: GrossProfit;
    researchDevelopment: ResearchDevelopment;
    sellingGeneralAdministrative: SellingGeneralAdministrative;
    nonRecurring: NonRecurring;
    otherOperatingExpenses: OtherOperatingExpenses;
    totalOperatingExpenses: TotalOperatingExpenses;
    operatingIncome: OperatingIncome;
    totalOtherIncomeExpenseNet: TotalOtherIncomeExpenseNet;
    ebit: Ebit;
    interestExpense: InterestExpense;
    incomeBeforeTax: IncomeBeforeTax;
    incomeTaxExpense: IncomeTaxExpense;
    minorityInterest: MinorityInterest;
    netIncomeFromContinuingOps: NetIncomeFromContinuingOps;
    discontinuedOperations: DiscontinuedOperations;
    extraordinaryItems: ExtraordinaryItems;
    effectOfAccountingCharges: EffectOfAccountingCharges;
    otherItems: OtherItems;
    netIncome: NetIncome2;
    netIncomeApplicableToCommonShares: NetIncomeApplicableToCommonShares;
  }

  export interface IncomeStatementHistory {
    incomeStatementHistory: IncomeStatementHistory2[];
    maxAge: number;
  }

  export interface ReportDate {
    raw: number;
    fmt: string;
  }

  export interface PctHeld {
    raw: number;
    fmt: string;
  }

  export interface Position {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface Value {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface PctChange {
    raw: number;
    fmt: string;
  }

  export interface OwnershipList {
    maxAge: number;
    reportDate: ReportDate;
    organization: string;
    pctHeld: PctHeld;
    position: Position;
    value: Value;
    pctChange: PctChange;
  }

  export interface FundOwnership {
    maxAge: number;
    ownershipList: OwnershipList[];
  }

  export interface PriceHint2 {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface PreviousClose {
    raw: number;
    fmt: string;
  }

  export interface Open {
    raw: number;
    fmt: string;
  }

  export interface DayLow {
    raw: number;
    fmt: string;
  }

  export interface DayHigh {
    raw: number;
    fmt: string;
  }

  export interface RegularMarketPreviousClose {
    raw: number;
    fmt: string;
  }

  export interface RegularMarketOpen {
    raw: number;
    fmt: string;
  }

  export interface RegularMarketDayLow {
    raw: number;
    fmt: string;
  }

  export interface RegularMarketDayHigh {
    raw: number;
    fmt: string;
  }

  export interface DividendRate {
    raw: number;
    fmt: string;
  }

  export interface DividendYield {
    raw: number;
    fmt: string;
  }

  export interface ExDividendDate {
    raw: number;
    fmt: string;
  }

  export interface PayoutRatio {
    raw: number;
    fmt: string;
  }

  export interface FiveYearAvgDividendYield {
    raw: number;
    fmt: string;
  }

  export interface Beta2 {
    raw: number;
    fmt: string;
  }

  export interface TrailingPE {
    raw: number;
    fmt: string;
  }

  export interface ForwardPE2 {
    raw: number;
    fmt: string;
  }

  export interface Volume {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface RegularMarketVolume {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface AverageVolume {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface AverageVolume10days {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface AverageDailyVolume10Day {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface Bid {
    raw: number;
    fmt: string;
  }

  export interface Ask {
    raw: number;
    fmt: string;
  }

  export interface BidSize {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface AskSize {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface MarketCap {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface Yield2 {}

  export interface YtdReturn2 {}

  export interface TotalAssets2 {}

  export interface ExpireDate {}

  export interface StrikePrice {}

  export interface OpenInterest {}

  export interface FiftyTwoWeekLow {
    raw: number;
    fmt: string;
  }

  export interface FiftyTwoWeekHigh {
    raw: number;
    fmt: string;
  }

  export interface PriceToSalesTrailing12Months2 {
    raw: number;
    fmt: string;
  }

  export interface FiftyDayAverage {
    raw: number;
    fmt: string;
  }

  export interface TwoHundredDayAverage {
    raw: number;
    fmt: string;
  }

  export interface TrailingAnnualDividendRate {
    raw: number;
    fmt: string;
  }

  export interface TrailingAnnualDividendYield {
    raw: number;
    fmt: string;
  }

  export interface NavPrice {}

  export interface Volume24Hr {}

  export interface VolumeAllCurrencies {}

  export interface CirculatingSupply {}

  export interface MaxSupply {}

  export interface StartDate {}

  export interface SummaryDetail {
    maxAge: number;
    priceHint: PriceHint2;
    previousClose: PreviousClose;
    open: Open;
    dayLow: DayLow;
    dayHigh: DayHigh;
    regularMarketPreviousClose: RegularMarketPreviousClose;
    regularMarketOpen: RegularMarketOpen;
    regularMarketDayLow: RegularMarketDayLow;
    regularMarketDayHigh: RegularMarketDayHigh;
    dividendRate: DividendRate;
    dividendYield: DividendYield;
    exDividendDate: ExDividendDate;
    payoutRatio: PayoutRatio;
    fiveYearAvgDividendYield: FiveYearAvgDividendYield;
    beta: Beta2;
    trailingPE: TrailingPE;
    forwardPE: ForwardPE2;
    volume: Volume;
    regularMarketVolume: RegularMarketVolume;
    averageVolume: AverageVolume;
    averageVolume10days: AverageVolume10days;
    averageDailyVolume10Day: AverageDailyVolume10Day;
    bid: Bid;
    ask: Ask;
    bidSize: BidSize;
    askSize: AskSize;
    marketCap: MarketCap;
    yield: Yield2;
    ytdReturn: YtdReturn2;
    totalAssets: TotalAssets2;
    expireDate: ExpireDate;
    strikePrice: StrikePrice;
    openInterest: OpenInterest;
    fiftyTwoWeekLow: FiftyTwoWeekLow;
    fiftyTwoWeekHigh: FiftyTwoWeekHigh;
    priceToSalesTrailing12Months: PriceToSalesTrailing12Months2;
    fiftyDayAverage: FiftyDayAverage;
    twoHundredDayAverage: TwoHundredDayAverage;
    trailingAnnualDividendRate: TrailingAnnualDividendRate;
    trailingAnnualDividendYield: TrailingAnnualDividendYield;
    navPrice: NavPrice;
    currency: string;
    fromCurrency?: any;
    toCurrency?: any;
    lastMarket?: any;
    coinMarketCapLink?: any;
    volume24Hr: Volume24Hr;
    volumeAllCurrencies: VolumeAllCurrencies;
    circulatingSupply: CirculatingSupply;
    algorithm?: any;
    maxSupply: MaxSupply;
    startDate: StartDate;
    tradeable: boolean;
  }

  export interface LatestTransDate {
    raw: number;
    fmt: string;
  }

  export interface PositionDirect {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface PositionDirectDate {
    raw: number;
    fmt: string;
  }

  export interface PositionIndirect {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface PositionIndirectDate {
    raw: number;
    fmt: string;
  }

  export interface Holder {
    maxAge: number;
    name: string;
    relation: string;
    url: string;
    transactionDescription: string;
    latestTransDate: LatestTransDate;
    positionDirect: PositionDirect;
    positionDirectDate: PositionDirectDate;
    positionIndirect: PositionIndirect;
    positionIndirectDate: PositionIndirectDate;
  }

  export interface InsiderHolders {
    holders: Holder[];
    maxAge: number;
  }

  export interface EarningsDate {
    raw: number;
    fmt: string;
  }

  export interface EarningsAverage {
    raw: number;
    fmt: string;
  }

  export interface EarningsLow {
    raw: number;
    fmt: string;
  }

  export interface EarningsHigh {
    raw: number;
    fmt: string;
  }

  export interface RevenueAverage {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface RevenueLow {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface RevenueHigh {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface Earnings {
    earningsDate: EarningsDate[];
    earningsAverage: EarningsAverage;
    earningsLow: EarningsLow;
    earningsHigh: EarningsHigh;
    revenueAverage: RevenueAverage;
    revenueLow: RevenueLow;
    revenueHigh: RevenueHigh;
  }

  export interface ExDividendDate2 {
    raw: number;
    fmt: string;
  }

  export interface DividendDate {
    raw: number;
    fmt: string;
  }

  export interface CalendarEvents {
    maxAge: number;
    earnings: Earnings;
    exDividendDate: ExDividendDate2;
    dividendDate: DividendDate;
  }

  export interface History {
    epochGradeDate: number;
    firm: string;
    toGrade: string;
    fromGrade: string;
    action: string;
  }

  export interface UpgradeDowngradeHistory {
    history: History[];
    maxAge: number;
  }

  export interface PreMarketChange {}

  export interface PreMarketPrice {}

  export interface PostMarketChangePercent {
    raw: number;
    fmt: string;
  }

  export interface PostMarketChange {
    raw: number;
    fmt: string;
  }

  export interface PostMarketPrice {
    raw: number;
    fmt: string;
  }

  export interface RegularMarketChangePercent {
    raw: number;
    fmt: string;
  }

  export interface RegularMarketChange {
    raw: number;
    fmt: string;
  }

  export interface PriceHint3 {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface RegularMarketPrice {
    raw: number;
    fmt: string;
  }

  export interface RegularMarketDayHigh2 {
    raw: number;
    fmt: string;
  }

  export interface RegularMarketDayLow2 {
    raw: number;
    fmt: string;
  }

  export interface RegularMarketVolume2 {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface AverageDailyVolume10Day2 {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface AverageDailyVolume3Month {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface RegularMarketPreviousClose2 {
    raw: number;
    fmt: string;
  }

  export interface RegularMarketOpen2 {
    raw: number;
    fmt: string;
  }

  export interface StrikePrice2 {}

  export interface OpenInterest2 {}

  export interface Volume24Hr2 {}

  export interface VolumeAllCurrencies2 {}

  export interface CirculatingSupply2 {}

  export interface MarketCap2 {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface Price {
    maxAge: number;
    preMarketChange: PreMarketChange;
    preMarketPrice: PreMarketPrice;
    preMarketSource: string;
    postMarketChangePercent: PostMarketChangePercent;
    postMarketChange: PostMarketChange;
    postMarketTime: number;
    postMarketPrice: PostMarketPrice;
    postMarketSource: string;
    regularMarketChangePercent: RegularMarketChangePercent;
    regularMarketChange: RegularMarketChange;
    regularMarketTime: number;
    priceHint: PriceHint3;
    regularMarketPrice: RegularMarketPrice;
    regularMarketDayHigh: RegularMarketDayHigh2;
    regularMarketDayLow: RegularMarketDayLow2;
    regularMarketVolume: RegularMarketVolume2;
    averageDailyVolume10Day: AverageDailyVolume10Day2;
    averageDailyVolume3Month: AverageDailyVolume3Month;
    regularMarketPreviousClose: RegularMarketPreviousClose2;
    regularMarketSource: string;
    regularMarketOpen: RegularMarketOpen2;
    strikePrice: StrikePrice2;
    openInterest: OpenInterest2;
    exchange: string;
    exchangeName: string;
    exchangeDataDelayedBy: number;
    marketState: string;
    quoteType: string;
    symbol: string;
    underlyingSymbol?: any;
    shortName: string;
    longName: string;
    currency: string;
    quoteSourceName: string;
    currencySymbol: string;
    fromCurrency?: any;
    toCurrency?: any;
    lastMarket?: any;
    volume24Hr: Volume24Hr2;
    volumeAllCurrencies: VolumeAllCurrencies2;
    circulatingSupply: CirculatingSupply2;
    marketCap: MarketCap2;
  }

  export interface EndDate3 {
    raw: number;
    fmt: string;
  }

  export interface Cash {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface ShortTermInvestments {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface NetReceivables {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface Inventory {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface OtherCurrentAssets {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface TotalCurrentAssets {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface LongTermInvestments {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface PropertyPlantEquipment {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface OtherAssets {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface TotalAssets3 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface AccountsPayable {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface ShortLongTermDebt {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface OtherCurrentLiab {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface LongTermDebt {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface OtherLiab {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface TotalCurrentLiabilities {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface TotalLiab {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface CommonStock {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface RetainedEarnings {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface TreasuryStock {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface OtherStockholderEquity {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface TotalStockholderEquity {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface NetTangibleAssets {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface BalanceSheetStatement {
    maxAge: number;
    endDate: EndDate3;
    cash: Cash;
    shortTermInvestments: ShortTermInvestments;
    netReceivables: NetReceivables;
    inventory: Inventory;
    otherCurrentAssets: OtherCurrentAssets;
    totalCurrentAssets: TotalCurrentAssets;
    longTermInvestments: LongTermInvestments;
    propertyPlantEquipment: PropertyPlantEquipment;
    otherAssets: OtherAssets;
    totalAssets: TotalAssets3;
    accountsPayable: AccountsPayable;
    shortLongTermDebt: ShortLongTermDebt;
    otherCurrentLiab: OtherCurrentLiab;
    longTermDebt: LongTermDebt;
    otherLiab: OtherLiab;
    totalCurrentLiabilities: TotalCurrentLiabilities;
    totalLiab: TotalLiab;
    commonStock: CommonStock;
    retainedEarnings: RetainedEarnings;
    treasuryStock: TreasuryStock;
    otherStockholderEquity: OtherStockholderEquity;
    totalStockholderEquity: TotalStockholderEquity;
    netTangibleAssets: NetTangibleAssets;
  }

  export interface BalanceSheetHistory {
    balanceSheetStatements: BalanceSheetStatement[];
    maxAge: number;
  }

  export interface Growth2 {
    raw: number;
    fmt: string;
  }

  export interface Avg {
    raw: number;
    fmt: string;
  }

  export interface Low {
    raw: number;
    fmt: string;
  }

  export interface High {
    raw: number;
    fmt: string;
  }

  export interface YearAgoEps {
    raw: number;
    fmt: string;
  }

  export interface NumberOfAnalysts {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface Growth3 {
    raw: number;
    fmt: string;
  }

  export interface EarningsEstimate {
    avg: Avg;
    low: Low;
    high: High;
    yearAgoEps: YearAgoEps;
    numberOfAnalysts: NumberOfAnalysts;
    growth: Growth3;
  }

  export interface Avg2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface Low2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface High2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface NumberOfAnalysts2 {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface YearAgoRevenue {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface Growth4 {
    raw: number;
    fmt: string;
  }

  export interface RevenueEstimate {
    avg: Avg2;
    low: Low2;
    high: High2;
    numberOfAnalysts: NumberOfAnalysts2;
    yearAgoRevenue: YearAgoRevenue;
    growth: Growth4;
  }

  export interface Current {
    raw: number;
    fmt: string;
  }

  export interface SevenDaysAgo {
    raw: number;
    fmt: string;
  }

  export interface ThirtyDaysAgo {
    raw: number;
    fmt: string;
  }

  export interface SixtyDaysAgo {
    raw: number;
    fmt: string;
  }

  export interface NinetyDaysAgo {
    raw: number;
    fmt: string;
  }

  export interface EpsTrend {
    current: Current;
    "7daysAgo": SevenDaysAgo;
    "30daysAgo": ThirtyDaysAgo;
    "60daysAgo": SixtyDaysAgo;
    "90daysAgo": NinetyDaysAgo;
  }

  export interface UpLast7days {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface UpLast30days {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface DownLast30days {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface DownLast90days {}

  export interface EpsRevisions {
    upLast7days: UpLast7days;
    upLast30days: UpLast30days;
    downLast30days: DownLast30days;
    downLast90days: DownLast90days;
  }

  export interface Trend2 {
    maxAge: number;
    period: string;
    endDate: string;
    growth: Growth2;
    earningsEstimate: EarningsEstimate;
    revenueEstimate: RevenueEstimate;
    epsTrend: EpsTrend;
    epsRevisions: EpsRevisions;
  }

  export interface EarningsTrend {
    trend: Trend2[];
    maxAge: number;
  }

  export interface Filing {
    date: string;
    epochDate: number;
    type: string;
    title: string;
    edgarUrl: string;
    maxAge: number;
  }

  export interface SecFilings {
    filings: Filing[];
    maxAge: number;
  }

  export interface ReportDate2 {
    raw: number;
    fmt: string;
  }

  export interface PctHeld2 {
    raw: number;
    fmt: string;
  }

  export interface Position2 {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface Value2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface PctChange2 {
    raw: number;
    fmt: string;
  }

  export interface OwnershipList2 {
    maxAge: number;
    reportDate: ReportDate2;
    organization: string;
    pctHeld: PctHeld2;
    position: Position2;
    value: Value2;
    pctChange: PctChange2;
  }

  export interface InstitutionOwnership {
    maxAge: number;
    ownershipList: OwnershipList2[];
  }

  export interface InsidersPercentHeld {
    raw: number;
    fmt: string;
  }

  export interface InstitutionsPercentHeld {
    raw: number;
    fmt: string;
  }

  export interface InstitutionsFloatPercentHeld {
    raw: number;
    fmt: string;
  }

  export interface InstitutionsCount {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface MajorHoldersBreakdown {
    maxAge: number;
    insidersPercentHeld: InsidersPercentHeld;
    institutionsPercentHeld: InstitutionsPercentHeld;
    institutionsFloatPercentHeld: InstitutionsFloatPercentHeld;
    institutionsCount: InstitutionsCount;
  }

  export interface EndDate4 {
    raw: number;
    fmt: string;
  }

  export interface Cash2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface ShortTermInvestments2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface NetReceivables2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface Inventory2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface OtherCurrentAssets2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface TotalCurrentAssets2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface LongTermInvestments2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface PropertyPlantEquipment2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface OtherAssets2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface TotalAssets4 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface AccountsPayable2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface ShortLongTermDebt2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface OtherCurrentLiab2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface LongTermDebt2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface OtherLiab2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface TotalCurrentLiabilities2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface TotalLiab2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface CommonStock2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface RetainedEarnings2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface TreasuryStock2 {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface OtherStockholderEquity2 {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface TotalStockholderEquity2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface NetTangibleAssets2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface BalanceSheetStatement2 {
    maxAge: number;
    endDate: EndDate4;
    cash: Cash2;
    shortTermInvestments: ShortTermInvestments2;
    netReceivables: NetReceivables2;
    inventory: Inventory2;
    otherCurrentAssets: OtherCurrentAssets2;
    totalCurrentAssets: TotalCurrentAssets2;
    longTermInvestments: LongTermInvestments2;
    propertyPlantEquipment: PropertyPlantEquipment2;
    otherAssets: OtherAssets2;
    totalAssets: TotalAssets4;
    accountsPayable: AccountsPayable2;
    shortLongTermDebt: ShortLongTermDebt2;
    otherCurrentLiab: OtherCurrentLiab2;
    longTermDebt: LongTermDebt2;
    otherLiab: OtherLiab2;
    totalCurrentLiabilities: TotalCurrentLiabilities2;
    totalLiab: TotalLiab2;
    commonStock: CommonStock2;
    retainedEarnings: RetainedEarnings2;
    treasuryStock: TreasuryStock2;
    otherStockholderEquity: OtherStockholderEquity2;
    totalStockholderEquity: TotalStockholderEquity2;
    netTangibleAssets: NetTangibleAssets2;
  }

  export interface BalanceSheetHistoryQuarterly {
    balanceSheetStatements: BalanceSheetStatement2[];
    maxAge: number;
  }

  export interface EpsActual {
    raw: number;
    fmt: string;
  }

  export interface EpsEstimate {
    raw: number;
    fmt: string;
  }

  export interface EpsDifference {
    raw: number;
    fmt: string;
  }

  export interface SurprisePercent {
    raw: number;
    fmt: string;
  }

  export interface Quarter {
    raw: number;
    fmt: string;
  }

  export interface History2 {
    maxAge: number;
    epsActual: EpsActual;
    epsEstimate: EpsEstimate;
    epsDifference: EpsDifference;
    surprisePercent: SurprisePercent;
    quarter: Quarter;
    period: string;
  }

  export interface EarningsHistory {
    history: History2[];
    maxAge: number;
  }

  export interface MajorDirectHolders {
    holders: any[];
    maxAge: number;
  }

  export interface TotalEsg {
    raw: number;
    fmt: string;
  }

  export interface EnvironmentScore {
    raw: number;
    fmt: string;
  }

  export interface SocialScore {
    raw: number;
    fmt: string;
  }

  export interface GovernanceScore {
    raw: number;
    fmt: string;
  }

  export interface PeerEsgScorePerformance {
    min: number;
    avg: number;
    max: number;
  }

  export interface PeerGovernancePerformance {
    min: number;
    avg: number;
    max: number;
  }

  export interface PeerSocialPerformance {
    min: number;
    avg: number;
    max: number;
  }

  export interface PeerEnvironmentPerformance {
    min: number;
    avg: number;
    max: number;
  }

  export interface PeerHighestControversyPerformance {
    min: number;
    avg: number;
    max: number;
  }

  export interface Percentile {
    raw: number;
    fmt: string;
  }

  export interface EsgScores {
    maxAge: number;
    totalEsg: TotalEsg;
    environmentScore: EnvironmentScore;
    socialScore: SocialScore;
    governanceScore: GovernanceScore;
    ratingYear: number;
    ratingMonth: number;
    highestControversy: number;
    peerCount: number;
    esgPerformance: string;
    peerGroup: string;
    relatedControversy: string[];
    peerEsgScorePerformance: PeerEsgScorePerformance;
    peerGovernancePerformance: PeerGovernancePerformance;
    peerSocialPerformance: PeerSocialPerformance;
    peerEnvironmentPerformance: PeerEnvironmentPerformance;
    peerHighestControversyPerformance: PeerHighestControversyPerformance;
    percentile: Percentile;
    environmentPercentile?: any;
    socialPercentile?: any;
    governancePercentile?: any;
    adult: boolean;
    alcoholic: boolean;
    animalTesting: boolean;
    catholic: boolean;
    controversialWeapons: boolean;
    smallArms: boolean;
    furLeather: boolean;
    gambling: boolean;
    gmo: boolean;
    militaryContract: boolean;
    nuclear: boolean;
    pesticides: boolean;
    palmOil: boolean;
    coal: boolean;
    tobacco: boolean;
  }

  export interface SummaryProfile {
    address1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
    website: string;
    industry: string;
    sector: string;
    longBusinessSummary: string;
    fullTimeEmployees: number;
    companyOfficers: any[];
    maxAge: number;
  }

  export interface BuyInfoCount {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface BuyInfoShares {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface BuyPercentInsiderShares {
    raw: number;
    fmt: string;
  }

  export interface SellInfoCount {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface SellInfoShares {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface SellPercentInsiderShares {
    raw: number;
    fmt: string;
  }

  export interface NetInfoCount {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface NetInfoShares {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface NetPercentInsiderShares {
    raw: number;
    fmt: string;
  }

  export interface TotalInsiderShares {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface NetSharePurchaseActivity {
    maxAge: number;
    period: string;
    buyInfoCount: BuyInfoCount;
    buyInfoShares: BuyInfoShares;
    buyPercentInsiderShares: BuyPercentInsiderShares;
    sellInfoCount: SellInfoCount;
    sellInfoShares: SellInfoShares;
    sellPercentInsiderShares: SellPercentInsiderShares;
    netInfoCount: NetInfoCount;
    netInfoShares: NetInfoShares;
    netPercentInsiderShares: NetPercentInsiderShares;
    totalInsiderShares: TotalInsiderShares;
  }

  export interface Shares {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface Value3 {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface StartDate2 {
    raw: number;
    fmt: string;
  }

  export interface Transaction {
    maxAge: number;
    shares: Shares;
    value: Value3;
    filerUrl: string;
    transactionText: string;
    filerName: string;
    filerRelation: string;
    moneyText: string;
    startDate: StartDate2;
    ownership: string;
  }

  export interface InsiderTransactions {
    transactions: Transaction[];
    maxAge: number;
  }

  export interface PeRatio3 {}

  export interface PegRatio4 {}

  export interface SectorTrend {
    maxAge: number;
    symbol?: any;
    peRatio: PeRatio3;
    pegRatio: PegRatio4;
    estimates: any[];
  }

  export interface EndDate5 {
    raw: number;
    fmt: string;
  }

  export interface TotalRevenue2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface CostOfRevenue2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface GrossProfit2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface ResearchDevelopment2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface SellingGeneralAdministrative2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface NonRecurring2 {}

  export interface OtherOperatingExpenses2 {}

  export interface TotalOperatingExpenses2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface OperatingIncome2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface TotalOtherIncomeExpenseNet2 {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface Ebit2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface InterestExpense2 {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface IncomeBeforeTax2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface IncomeTaxExpense2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface MinorityInterest2 {}

  export interface NetIncomeFromContinuingOps2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface DiscontinuedOperations2 {}

  export interface ExtraordinaryItems2 {}

  export interface EffectOfAccountingCharges2 {}

  export interface OtherItems2 {}

  export interface NetIncome3 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface NetIncomeApplicableToCommonShares2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface IncomeStatementHistory3 {
    maxAge: number;
    endDate: EndDate5;
    totalRevenue: TotalRevenue2;
    costOfRevenue: CostOfRevenue2;
    grossProfit: GrossProfit2;
    researchDevelopment: ResearchDevelopment2;
    sellingGeneralAdministrative: SellingGeneralAdministrative2;
    nonRecurring: NonRecurring2;
    otherOperatingExpenses: OtherOperatingExpenses2;
    totalOperatingExpenses: TotalOperatingExpenses2;
    operatingIncome: OperatingIncome2;
    totalOtherIncomeExpenseNet: TotalOtherIncomeExpenseNet2;
    ebit: Ebit2;
    interestExpense: InterestExpense2;
    incomeBeforeTax: IncomeBeforeTax2;
    incomeTaxExpense: IncomeTaxExpense2;
    minorityInterest: MinorityInterest2;
    netIncomeFromContinuingOps: NetIncomeFromContinuingOps2;
    discontinuedOperations: DiscontinuedOperations2;
    extraordinaryItems: ExtraordinaryItems2;
    effectOfAccountingCharges: EffectOfAccountingCharges2;
    otherItems: OtherItems2;
    netIncome: NetIncome3;
    netIncomeApplicableToCommonShares: NetIncomeApplicableToCommonShares2;
  }

  export interface IncomeStatementHistoryQuarterly {
    incomeStatementHistory: IncomeStatementHistory3[];
    maxAge: number;
  }

  export interface EndDate6 {
    raw: number;
    fmt: string;
  }

  export interface NetIncome4 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface Depreciation2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface ChangeToNetincome2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface ChangeToAccountReceivables2 {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface ChangeToLiabilities2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface ChangeToInventory2 {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface ChangeToOperatingActivities2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface TotalCashFromOperatingActivities2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface CapitalExpenditures2 {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface Investments2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface OtherCashflowsFromInvestingActivities2 {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface TotalCashflowsFromInvestingActivities2 {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface DividendsPaid2 {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface NetBorrowings2 {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface OtherCashflowsFromFinancingActivities2 {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface TotalCashFromFinancingActivities2 {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface ChangeInCash2 {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface RepurchaseOfStock2 {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface CashflowStatement2 {
    maxAge: number;
    endDate: EndDate6;
    netIncome: NetIncome4;
    depreciation: Depreciation2;
    changeToNetincome: ChangeToNetincome2;
    changeToAccountReceivables: ChangeToAccountReceivables2;
    changeToLiabilities: ChangeToLiabilities2;
    changeToInventory: ChangeToInventory2;
    changeToOperatingActivities: ChangeToOperatingActivities2;
    totalCashFromOperatingActivities: TotalCashFromOperatingActivities2;
    capitalExpenditures: CapitalExpenditures2;
    investments: Investments2;
    otherCashflowsFromInvestingActivities: OtherCashflowsFromInvestingActivities2;
    totalCashflowsFromInvestingActivities: TotalCashflowsFromInvestingActivities2;
    dividendsPaid: DividendsPaid2;
    netBorrowings: NetBorrowings2;
    otherCashflowsFromFinancingActivities: OtherCashflowsFromFinancingActivities2;
    totalCashFromFinancingActivities: TotalCashFromFinancingActivities2;
    changeInCash: ChangeInCash2;
    repurchaseOfStock: RepurchaseOfStock2;
  }

  export interface CashflowStatementHistoryQuarterly {
    cashflowStatements: CashflowStatement2[];
    maxAge: number;
  }

  export interface Actual {
    raw: number;
    fmt: string;
  }

  export interface Estimate2 {
    raw: number;
    fmt: string;
  }

  export interface Quarterly {
    date: string;
    actual: Actual;
    estimate: Estimate2;
  }

  export interface CurrentQuarterEstimate {
    raw: number;
    fmt: string;
  }

  export interface EarningsDate2 {
    raw: number;
    fmt: string;
  }

  export interface EarningsChart {
    quarterly: Quarterly[];
    currentQuarterEstimate: CurrentQuarterEstimate;
    currentQuarterEstimateDate: string;
    currentQuarterEstimateYear: number;
    earningsDate: EarningsDate2[];
  }

  export interface Revenue {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface Earnings3 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface Yearly {
    date: number;
    revenue: Revenue;
    earnings: Earnings3;
  }

  export interface Revenue2 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface Earnings4 {
    raw: any;
    fmt: string;
    longFmt: string;
  }

  export interface Quarterly2 {
    date: string;
    revenue: Revenue2;
    earnings: Earnings4;
  }

  export interface FinancialsChart {
    yearly: Yearly[];
    quarterly: Quarterly2[];
  }

  export interface Earnings2 {
    maxAge: number;
    earningsChart: EarningsChart;
    financialsChart: FinancialsChart;
    financialCurrency: string;
  }

  export interface CurrentPrice {
    raw: number;
    fmt: string;
  }

  export interface TargetHighPrice {
    raw: number;
    fmt: string;
  }

  export interface TargetLowPrice {
    raw: number;
    fmt: string;
  }

  export interface TargetMeanPrice {
    raw: number;
    fmt: string;
  }

  export interface TargetMedianPrice {
    raw: number;
    fmt: string;
  }

  export interface RecommendationMean {
    raw: number;
    fmt: string;
  }

  export interface NumberOfAnalystOpinions {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface TotalCash {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface TotalCashPerShare {
    raw: number;
    fmt: string;
  }

  export interface Ebitda {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface TotalDebt {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface QuickRatio {
    raw: number;
    fmt: string;
  }

  export interface CurrentRatio {
    raw: number;
    fmt: string;
  }

  export interface TotalRevenue3 {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface DebtToEquity {
    raw: number;
    fmt: string;
  }

  export interface RevenuePerShare {
    raw: number;
    fmt: string;
  }

  export interface ReturnOnAssets {
    raw: number;
    fmt: string;
  }

  export interface ReturnOnEquity {
    raw: number;
    fmt: string;
  }

  export interface GrossProfits {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface FreeCashflow {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface OperatingCashflow {
    raw: number;
    fmt: string;
    longFmt: string;
  }

  export interface EarningsGrowth {
    raw: number;
    fmt: string;
  }

  export interface RevenueGrowth {
    raw: number;
    fmt: string;
  }

  export interface GrossMargins {
    raw: number;
    fmt: string;
  }

  export interface EbitdaMargins {
    raw: number;
    fmt: string;
  }

  export interface OperatingMargins {
    raw: number;
    fmt: string;
  }

  export interface ProfitMargins2 {
    raw: number;
    fmt: string;
  }

  export interface FinancialData {
    maxAge: number;
    currentPrice: CurrentPrice;
    targetHighPrice: TargetHighPrice;
    targetLowPrice: TargetLowPrice;
    targetMeanPrice: TargetMeanPrice;
    targetMedianPrice: TargetMedianPrice;
    recommendationMean: RecommendationMean;
    recommendationKey: string;
    numberOfAnalystOpinions: NumberOfAnalystOpinions;
    totalCash: TotalCash;
    totalCashPerShare: TotalCashPerShare;
    ebitda: Ebitda;
    totalDebt: TotalDebt;
    quickRatio: QuickRatio;
    currentRatio: CurrentRatio;
    totalRevenue: TotalRevenue3;
    debtToEquity: DebtToEquity;
    revenuePerShare: RevenuePerShare;
    returnOnAssets: ReturnOnAssets;
    returnOnEquity: ReturnOnEquity;
    grossProfits: GrossProfits;
    freeCashflow: FreeCashflow;
    operatingCashflow: OperatingCashflow;
    earningsGrowth: EarningsGrowth;
    revenueGrowth: RevenueGrowth;
    grossMargins: GrossMargins;
    ebitdaMargins: EbitdaMargins;
    operatingMargins: OperatingMargins;
    profitMargins: ProfitMargins2;
    financialCurrency: string;
  }

  export interface Result {
    assetProfile: AssetProfile;
    recommendationTrend: RecommendationTrend;
    cashflowStatementHistory: CashflowStatementHistory;
    indexTrend: IndexTrend;
    defaultKeyStatistics: DefaultKeyStatistics;
    industryTrend: IndustryTrend;
    incomeStatementHistory: IncomeStatementHistory;
    fundOwnership: FundOwnership;
    summaryDetail: SummaryDetail;
    insiderHolders: InsiderHolders;
    calendarEvents: CalendarEvents;
    upgradeDowngradeHistory: UpgradeDowngradeHistory;
    price: Price;
    balanceSheetHistory: BalanceSheetHistory;
    earningsTrend: EarningsTrend;
    secFilings: SecFilings;
    institutionOwnership: InstitutionOwnership;
    majorHoldersBreakdown: MajorHoldersBreakdown;
    balanceSheetHistoryQuarterly: BalanceSheetHistoryQuarterly;
    earningsHistory: EarningsHistory;
    majorDirectHolders: MajorDirectHolders;
    esgScores: EsgScores;
    summaryProfile: SummaryProfile;
    netSharePurchaseActivity: NetSharePurchaseActivity;
    insiderTransactions: InsiderTransactions;
    sectorTrend: SectorTrend;
    incomeStatementHistoryQuarterly: IncomeStatementHistoryQuarterly;
    cashflowStatementHistoryQuarterly: CashflowStatementHistoryQuarterly;
    earnings: Earnings2;
    financialData: FinancialData;
  }

  export interface QuoteSummary {
    result: Result[];
    error?: any;
  }

  export interface RootObject {
    quoteSummary: QuoteSummary;
  }
}

export namespace YFDividendHistory {
  export interface HistoryList {
    dateString: string;
    amount: number;
    date: Date;
    year: string;
  }
  export interface Pre {
    timezone: string;
    start: number;
    end: number;
    gmtoffset: number;
  }

  export interface Regular {
    timezone: string;
    start: number;
    end: number;
    gmtoffset: number;
  }

  export interface Post {
    timezone: string;
    start: number;
    end: number;
    gmtoffset: number;
  }

  export interface CurrentTradingPeriod {
    pre: Pre;
    regular: Regular;
    post: Post;
  }

  export interface Meta {
    currency: string;
    symbol: string;
    exchangeName: string;
    instrumentType: string;
    firstTradeDate: number;
    regularMarketTime: number;
    gmtoffset: number;
    timezone: string;
    exchangeTimezoneName: string;
    regularMarketPrice: number;
    chartPreviousClose: number;
    priceHint: number;
    currentTradingPeriod: CurrentTradingPeriod;
    dataGranularity: string;
    range: string;
    validRanges: string[];
  }
  export interface DividendEntry {
    amount: number;
    date: number;
  }

  export interface Dividends {
    [key: number]: DividendEntry;
  }

  export interface Events {
    dividends: Dividends;
  }

  export interface Quote {
    high: number[];
    low: number[];
    volume: any[];
    open: number[];
    close: number[];
  }

  export interface Adjclose {
    adjclose: number[];
  }

  export interface Indicators {
    quote: Quote[];
    adjclose: Adjclose[];
  }

  export interface Result {
    meta: Meta;
    timestamp: number[];
    events: Events;
    indicators: Indicators;
  }

  export interface Chart {
    result: Result[];
    error?: any;
  }

  export interface RootObject {
    chart: Chart;
  }
}
