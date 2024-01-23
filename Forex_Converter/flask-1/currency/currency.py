"""Functions handling currency."""

from forex_python.converter import CurrencyCodes, RatesNotAvailableError

codes = CurrencyCodes()


def check_currency_code(code):
    """Is currency code valid?

        >>> check_currency_code("USD")
        True

        >>> check_currency_code("FOOBAR")
        False
    """

    return codes.get_currency_name(code) is not None


def convert_to_pretty(results, code_to):
    """Convert amt between currencies & return pretty result.
    """

    try:
        amt = f"{(results):.2f}"
    except RatesNotAvailableError:
        return None

    symbol = codes.get_symbol(code_to)
    return f"{symbol} {amt}"
