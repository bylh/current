export interface Coin {
    currency_code: string,
    balance: string,
    locked: string
  }
  export interface Ticker {
    market_code: string,
    buy: string,
    sell: string,
    open: string,
    high: string,
    low: string,
  }
  export interface Order {
    id: number	// 委托订单 ID
    side: string	// Buy/Sell, 代表买单/卖单.
    ord_type: string	// limit: 限价单；
    price: number	// 价格
    avg_price: number	// 平均价格
    state: string	// 委托订单状态: wait、done、cancel
    state_i18n: string	// 委托订单状态(国际化)
    market_code: string	// 交易对
    market_name: string	// 订单参与的交易市场
    market_base_unit: string //	市场基准货币
    market_quote_unit: string //	市场报价货币
    created_at: string	// 下单时间, ISO8601格式
    volume: number	// 交易数量（买入、卖出）volume = remaining_volume + executed_volume
    remaining_volume: number // decimal	未成交的数量
    executed_volume: number // decimal	已成交的数量
  }