import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { ChevronDown, Mail, ArrowRight } from "lucide-react";

const G = {
  white: "#ffffff",
  bg: "#f7f7f7",
  card: "#ffffff",
  border: "#e8e8e8",
  green: "#3c7a4a",
  greenLight: "#e8f2eb",
  black: "#1a1a1a",
  text: "#333333",
  muted: "#777777",
  shadow: "0 2px 20px rgba(0,0,0,0.06)",
};

const LOGO_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAs/UlEQVR42u2de5xcVZXvf2vtfU5V9SMJhjQIKII8OyJC1OvF0Q4XCZhAYgIVeYoCBgVRcLxXrzNjpRyd0XGUe1Gik4kKCBJTA5FAYiBcTKnjMGrGEU0jgzpGMZjwTKe7q+qcvde6f1RV02Qk3R2Sfu6vnyCf0N3VZ+/12+ux194HCAQCgUAgEAgEAoFAIBAIBAKBQCAQmJxQGIKxHf98Ps87O3cSMBfA5sZf1/+9o7tDS6WSANAwVIEpQz6fN/k1eTPsr1+TN/n88L8+EDzIhKRQKPDy5cuViBQAFi5c2K5HZmdLq31txkbtfbt6TwSA1ultj9Rcupv73MO0rbp13bp1u5vfDwDFYlHCaAaBTC6vsSZvSktLHgDmX73krXFrZqkzvFhjPiyOCMo0EEcRABJFkiooke3Wy9pkV23NhpV3fW/PnxUIApnwY1woFKhYLMqiK/Ov89PNZ7jVnkUZhk89JBUlwOseaQaBoFDDkSGODFBVUCKr5enqp+5ZdefWQqHAxWJRQ35yYAlx7QEOqcrfK2t5c1kXXJP/kB4clzAtc1yaJqKpeBUl1P/HINrjDxhEpF5VUvEOAm6PTkKWL3v1SZ19qz5300MDn1EuB5EEDzLxEvFSqeTz6Ix7rz/pa/HMlovTpKpwKkxshEZm0yyAgpwatTaTRfpc5fY/3N991cMPP9zX1dVly+WyC6MePMiEoKvQZTes2OBfnz/t+Nw5J3w7ellmflqpOqhhMLGwjnhlElaAmElIva/5THv2de2vnDlv2qtmfe9f7tn85Jxlc6IntjwRkvfgQcb3eHYVuky5WHbz3nveaXZmvNa2Rh2umjgQ2f36SaLOtsTW9bud2O0Xb/jit37YSN7Dvsl+hMMQ7L98A4CWi2V35gfzl0QdmbLJmo60mvr9Lg4AYLJpJfEm5g6absvzrs+/t1HZ0mY5OBA8yLgJqcrFsjv+tOPbj3vTKZ8x06KrE5+qeigxHVhjFQgZUBTFlPakX6/9+6PXP/DAll3N3ynMThDIWHsNFItFWXDlO+ZgZuvX7bT4pKRS9aRg0CiNr0KVIHEuY9JdyWPxM+mF315V2hI2FoNAxtxrAMDZH8xfH03LfZpizbla4kBs99XQG7Oyb/Oi4kwcWziq+F2Vv9hwY+mGPX/XQBDIASWfz5vSmpKAoGdfvLAzOrzlBm7PzHNpCnUixMQ6wglQVRWCGmuYAPjUCylA9f2QYWfcBEBFhSyziSJoT+3+dHv/9RtvX9cNBeWX5rlUCjvwIyGUeYe/ulMX6uVbFMELrs3/L3tIy81oi2cntcSTgDCCfEObBg31NjJsyZJU0+2Uyu4oE0/TmEm8eAaxjmQZIyII1Hkvpi1zrGmLLjn2dSfoY/O7f9jd3S1dhS67rbwtVLmCB9l/Y9Qs3QLAuVcsebN/WeaGaHr0hiR1QKqeiYyOYOOPGgLxUJfNZqzf7X6fPtt33e4/yiaXJHTwMdPfxu3RJ22rnV2pVVMrFI3EkwAAKUFUPSIycWSR7kp+bJ5Jrr/nq3f986CwyyOUhINA9jmcGtQU+JZ3znvFjFd2XCexXsdZYl91jtQasCcd8AfDGXACVNWz+mw2Z/XZ/nL1ieTC+25f+8QLPnvevJfVXjP9dp7ZenZSqTkSGDCRDtueFQQGhFXJeZO1VqoqSPT/9P72uc+VSxv+OBAyhrArhFgjzTO6H+nW7lK3nnbaae1vOP8t18azWr5h2qMznDho4pWYjRJIh5tTU+MfAoEBZaLYpE/XVtzzhW9d8Ouf/3L3oNCHugpddsPXHux79F+6bz/25BPabFv0Z6Ki8KRENMwUvtEdTCAisKRe1IDitsxpcXt80YmnzKZD/7j7pxt++MO0UChwR0cHd3d3h8kPAtlrKGW3lbdJd3e3AjALPnzJRe1HH3SbHhRfJOpaXOIcgQyIaKQumJShUM9ZMsYbuD/2//mGm0p/paoAwLcUbxlYxbeVtwkKBS7MnUsrP3PT/ceeeMIfOWvP0YyyOHgGM4YR0tEeuQkB5FPnOKLpNC07L3P8EYuOOaXzyX/8u5u2Np4Z+TV5010KQgkh1uDke/nzOUYeMP3XXXgBsubPbYs5xauD1LwDkRlp+XUg8FIASi7ORZb708crO9PLv/PV0qZh5AHPt65csfjM3KzsbdQWd9T6U0ektpmX0MifWaHqOWstCUMT3ay73ar1X7xjNQA/kKMsL3vQ1M5RpqxA8vm8QR5o5hhHz5kz/TVvPm6JtvG1JmtP8VC4JPFQkAGx0L4NrogIG6YoE5PvqW2o/K7/vQ+sXrd9JHsTza89651nvSrzqpk3cXs0P6kmqiJKzPu0U88KeKgAgM3GbITgqu6nUY0+/8yW399dLpd7mx4FJWCq5ilTSiCFQoE3YzOXl2/2aBx7nX9Z/lA7gy9KM/aDdlp8JHmHNHUeqkT00tpESMRxJrKawKW7qsX7vvRPn9rXxHjw98z/0Pl/adqzBUSwUkudMr+kXi9VeBBgI2OULXS3+61N3Jf7nu5d/cA37v1d44uoa/lcM9W8Ck0BVXAXNvNczJXBLRdnve+8t0Tt2csowjtszs503sGl3jeidX5pBqcCAqKWLOuu9Jeyo3fZ+pvv/n6hUODi8qLus4EVClxAvXVk0ZXnvUUPzq7EtOiEtL+2XwRd/71JrWVjbQTXlz6rKe5Kn6vect+qO78/eKHpnt1NpXx9wzQIZII9U/MqnT1Xu7e9e8mxuYNbF0gsi9nQWzlj4dIU3ntPCmIQCwO0r1OuBIU6mzGWUwaquPG5H237i3K53Ls/2z2aP6urq6ttxhtf+XfUYt7vOYVLvCOw3dcHUKofzBKoACpsjLVxDF/1oES+Z6v4VqbXf3v111Zv39MrNxagSXcEmCb0765AYXmBumd3086tO2lPLwEAXVfkj5k+I/MWZblIrP4Zt2WyEIFUUxWoEOglNxUSAA/1xGqycQ7Sk/zS7/YfuvfL37p/X0OqEYVcy85bEh+U/TS1RydUa/1QITHE/JItVaEKFRBxFMdkQHCVWg9SLSPFHX3P+u89eGvpD38qjO2Y3aGdWzu14TExUYUzPgXS6Bv6rxeq1dm8fLNvXp2zJ4suWzQjnZY5xWbt6cKY51hPzbTEkUIgiQM8nGciAGa/RAdaX21NLmOpX7ytyd/86uEnP/vwpk19o3CAifJr8lxaWvKnnXZa+8GvP/zT1J65WrJsfLXmgMb59pf6IXW/4IUEbNjYKAaUkFaTHuP0xxC6X5L0//X+bOejzeT+T4RvNHf53D22Fepz29Hdoc3+tiCQoSpLGHbFhOZflj/EWOmgadGrvZXTyNrXQfVkiu0skzHw3kFSDxX19RCCmUAEyH7QMJQUniO2xhqgX75b25l8fOOqNQ8dKK8xHG9y9vsuflM8XW/kadEbfOogiXe6DyXqF4Zeje3QeilPFSpEADEMxxaGDNJKCvLyOIB/h/ifRgn/1PWkv/aOd264pbRjOIvECOd/CgmkUGAddKFa14UXHtw2LXlN3BK9VrKcrfZWZ+eyOUtM5EnVeX+kMXamgz+CjLZFGQtmA68K5z3UeSWFr287g/f7c6o6NmRNJgvtS38ju2tfuPeLpZsG5Qdj0eM04E06gfjV111wFbVG11FLdLSr9kMEnoj278awQhUQgiqILEWMiA0MEZz3SGsOKtRrYR733j1tjdlGSqRQrfVXXDaX3cqpVJN+fbi3h39RvuOOp5reZvny5TQezrGMuUBesPq9/7x5dlrmPWT4TDZmJjIEZQVp09oa/64KEYU6ACpQhVeIAkSsYOUD8lz1rnQmE2VjSEWelUq6ovdXT/x9+e7yc1BQYXlhzCe1UChw8ZNFgQKLFi2a4Y5r/Qhius622Na0UlNVEqID00HRrIIRoKivTgbEIAvUfTdBGy03rPWiAJSAmkC8PK1eNrme2tc3fvnOA5a7TSiBNKsx8y4595j40JbPc2tmISKFJg7eqwAkg3/R50skRIASkZKCCCCA6uKh5sDvv3RIoSLEMFE2A9/vPZy/ubKz9jf/7+t3/Wbwc4yn0HlwB/K8y5ackDks+z/Vmss5y3CVpB52GjAp7VcbGBj7uvWDoKo6MDMD/5kG4lQAUDaGmGILpATpq63b/btn/qK8ZtMvxnpsx0wgc5Yti7asXJkueO/5F9AhmZWU43bXn0q9UXsUj6sOUcFhhjG5LLQvrUWevlF7qvaV9atKW8Y4nNonoZy+bOFbZ8xovTI1dDG1xSzVaj302g+VvP0VrgFKtiVi6Zd+/3Ttio1f+afVTVuZMgJpus551yz+aO7g9s84pFAn+35UdX+HCSBlQ8bGEXxfWtUUt5nddMO6f7i9G2i0wW/tVEyQs94DG3uNtppz33/Ba2l6dK2wXmpabMalCdSJU4CJaOxvRFFxsGwtIvQ/tftjD9y09rNjFW7RWInjrKvzF+YOaf1m6ioinomY90t1aSShgALges+6NjbHKIotkzHQPvdULU2/4Z9yX37g5rseawqjc2unTtRLEPbsPzvryvNm0wx7XRxHi7nVzvSpg0ud1Lv4ietpxFg8KgMiykbU2hxXdvRddN+K0h1jIRIaC3G87fKFr88eOu1HalXEexqTVase/HohhWEYG1uoM/CV5GH2sspv6yltaB4qmuDCGMqjLLxg4WE4vPViiegKzsbHk/WQagoV2r97RvvgzdkYJUdc/WPPGx/42rqfjLZIRlMgVCgUqLu7m3qPNFuiadHJSS31vL9Lj0NXopQAAZHlTARDDOmv9cDTg363v3nDim/di0bL90QLpV6qUI455pjMifNOWUTT4ksc+zNNazarItBaClVthmA0mnYjqj7ORCbtSX/Wts3P6ezs1NFsaRm1B20eXz37msXX5l4+7cZKJXFEbA+sC1dAIVo/rqRgWBNZMFv4SgoVfM8k+Fbu2Rf2F+XX5M1UaMQbXKobfCYGqPetxQdl3oEsljDzm2wugngP71JA4KRZtCXwgTQjJYaKuFwutpUnej648aa1XxzN96PQaE4CCFjwkfzPzbRsZ5o4YcDo/vwEbd6hxtI4bmrYgoy1IGKkfWnCiWwl0XtcL+75zsrVP3nBatrdTVP8nYCUz+e5sUoPrFwL3n/RHM7JQmU9V2I7O2qJYoXAOwdxUCh8vagr9U4F2n+2RQAE8Ca2rD3V7vV/XzqpcUps8niQZty48OoL/pvOjH7oJMWIrrNRyPO3qgGNUrA2z9NpfQ/KEDOYGWzrX+FqAnH+99bTj0hpY3V38v37vlJ69L+snOHk3J8Mv+pnZ144Nme9L398tj1+i5Ke7Yy+ka15hc0wlBTiABGBSn3zlnTQHAH1vavBpkdD3w3d7LjzrBJRBHoqPW3ditX/Olq5yKiUVetNh4Bv4S6bNcx9qfMGTHjx1vLGnVFQqHJsmdDYD2zcQtD8A1WoV/iag3p5MvHJjliiX1hPP4RLH0ofebZ7w6ZNfYN/cNcnuuxczJUiFaWMskMxCGJPGh5EUBwklk+WXWOBeRTAqjPPPLM1c+JBnWSjN3mjpyWcvsYaewiDZpmMNWQIIIKqPv+noRmFQlLXWNtefHVSGmjDF9NibNriuwD8a9OmJoVAOmZ31J9f3OmQCEI05PWDJIBEhFgMSUV+R0S7xYs6pyDWncbYnb6WbgfhjwT8KvaZx5Knnv3Dfd9c/+yfyn8Gt8OXi2VXRjmoYKRiwQvb2UtLS33YhB8D+DGALwLAgosWHBQdfNDhSaVyrALHQHGoyUSHee86VKjDWAIbJlVtt5F5ZcIKTgHlvXsRBZGKgsSdDuDvBmxqUuQgjT6RBR9e2k0zMif6WipDlXaVVJiiWtQj757+08fX3VouV4c7Ik1BhPeMj07OsrNzJzUE44drDu/q6sruOuWIhek0vlk0zZAOYQ+qYjIR63O1R9Z/YU3nQO/RpEnSASz835c8LDmcJDUnezunoICzucjqrnTtvX93x5JGgt+82BmFT9RXscEeqrFPEV5qOQ5EUyg8f4it+ZdzMVeaTZSDijZ6zv+68C6aHi12ldTR3iIaVeGMZa7g5+v+9rbXjtbDjGprh6jQXn3pgEutH9t2tbQvn8+b31z1G96CLWlTPYNdfmDc0VyoXsCeIe2cq+bYo/NHS28t7YsQN2/gG+InK4RkVBf18f0mIoUplUq+7eVtwStMMtpe3qalUslDx/flheNaIC92rDYwieKxcT7H4V12gUAQSCAQBBIIBIEEAkEggUAQSCAQBBIIBIEEAkEggUAQSCAQCAIJBIJAAoEgkEAgCCQQCAIJBIJAAoEgkEAgCCQQCAIJBIJAAoFAEEggEAQSCASBBAJBIIFAEEggEAQSCASBBAJBIIFAEEggEAgCCQSCQAKBIJBAIAgkEAgCCQSCQAKBIJBAIAgkEAgCCQSCQAKBQBBIIBAEEggEgQQCQSCBQBBIIBAEEggEgQQCQSCBQBBIIBAIAgkEgkACgSCQQCAIJBAIAgkEpq5A6AB9bWDqQBI8SCAwRUOsEX4aUfAjk94jDHOOtRFXEE9igZAM1+AJCoKJTLCgSc6I51h48gpEdSTZBcFwEMikF8g4n+NRFYgXAVHTXQYCIw/HnJdJKJCG0xDvRvAtChAkmMXkRghCqhjWskmAb9oQTSaBNJ5GvK+7kKFCMQKpCCq15NUAsHn5Zh9MaXLRnNNqWjtaVYDhGAYIIiqjqZBREUjXJ95qASCbyz1GRKAhqtmkSioKG0dtDdcaorLJFy4pABgbTRNVkCrtXRokTIRcNn5ssE1NqhykVq1Vhql7UgEUMvO0hQvbMapONTBaIUXnvDe9TNUfCl+PGobzjWklqUzCJH0uACDOZB6p1711qBALKgBYD5px3EGt9b8MTmTS0JjLWa89PmZDLSoEHTLCUhAR4mzmkcE2NUkEshkA4GpJX31waIjlhUhFFZbjvp7eIwAgv3Rp2PWfJAzMZU/vEbCcURWlISMEAkSRVCp9g21qUgikY3aHAkAc0WPwOqQ7JSiUVIy1JtsSHRJManLS2hIdYiJrFBhyC1kJBFHExj4GAB3dHTppBIJSw/D79VlxIvUgam8JCAAVNWxh4E8EgJ2dnSEHmSTs7NzZmMv0REMMQJSGDKGVxIn4RJ+ddDlIZ2enAkC6G79ziUuImfeWiGi90gUlASx3jqZLDYwi1nYq1RfEvS+ZUGZmn7pEd+N3g21qUgikWCwKAPRu27lDSbezYai++JKhIKgSi3qA6QQAKC8vh72QScLAXLI5QUShAOtec3pVMgyBbu/dtnPHYJuaJEk6UNACl8tlB8FvyBDqHSe0l4oFSLyAGEedecmZrfWt9VDqnQQQCHrmJWe2EstR4h0IRHuzBVZWGIAFvymXy66ghVGz21H7oM3L658Vi+02ZEFQ3Wu5ty4QJcMHo63tKAAoFApBIBOcgTlsazuKDB8sIoohijYKqCULK9w92JYmlUAGwk7Hj2C4be8Cb3KRjTLmzfUsZHMo9U5wmnPImejNJhdZCIYOnQmAEqyjR0Y7Hx01g+vo7lYA6E3dz1KXgJR4OBGTQmAiMxd4vlwcmLgMKvnP1WGcnyVlEITTJEUt1Z/VbWn07GA0QxYCoF35fFvb0fZXlOVDvBMh2otIVYUjw+jzjz/1298e91DpoUrz5wRTm6D5B6Bvyr8pd/CrXvUfaDVHSOoFtJdzggqhiBkV2dH7kDumXC71jqYNjGbIooVCgculUi+L/jvVT5Lt/SGJWJyoz9rDWmcefgIA5PP5EGZNUJpz1zrz8BN81h4mTnSv4mjYDUUGLPrv5XKpt1Ao8GgukKNqbM3406XpTwyREobRpavwNms4mzNnA4M3mQITjebcZXPm7ChrmBTDKd2rBavU0p+MRR46qh/WjD/Z6WZNhBQ65OcrEZEXsDFLAFAZc8MhqglKY+6IjVkCL5Bh3NigAGviCaKbxyIPHVWBlJaWBACe3rH939L+2nNsDUNVhhggo7VUJWNOOfuqi09EsSgNNxuYQBQKBUaxKAuvuvhEzZhTJElVCWaoCg1b5rS/9tzTO7b/22AbmpQCAaD5fN48VHroGfV40ESsOkSYxVA4wEc5a7Jt6aKxcLOB/Rdec0u6yOascYDnIfqvFFATWVXPDz5UeuiZfD5vRrtAM+qG1oxDpZrez0pD3uHQkA879fCWz1eA5oYwa8IxF3NFAfIxn+/UgxTMQ5g6AcoKkmrt/rHKP3ksBgoAsv2ywfUlVWKye89BACJilzjP2fjU+e897+xisSiN1SQwAcjn86ZYLMr89553NmfjU13iPBHxUPvFxGRdX62a7ZcNg21nUguk2Mgh7r757t8D+gPKGEDh6UXaOZv3XZAAiAim3X4gmNzEhNrtBxDVbyTY2z0mpFS3iYwBgB/cffPdvy8UCjxaDYpjKpAX5BD9/k4DUz8J8+Jutv6HwEmtJpSNzp53yeKTS6VS8CITxHuUSiWZd8nik03Wnp3UakIEbs7ri8+7qIEB+v2dY5l3jsmHlov1dmf3xO473e7qc2TY6NDJF5FAqNVwPCtzNQBFPhjg+FdIPRCIZ2WuplbLJJAhtAEFlAwbt7v6nHti952DbWZKCASA5tfkzcbSxie15teaTEykOuQAEMiktUSRo3ctuXzJkaWlpVDyHccUCgUuLS3JksuXHIkcvSutJUogM/Q8qzeZmLTm124sbXwyv2b0q1djLZCBY7iuT1b5mtS70oZSFRHBq1BrlE3b478GoN2zu8PO+jilMTeaTo//mlqjLLyKDus6d2VfU7g+WTXYVqaUQEqlkkehwPf/450PoeIeomxEOmTrgcKATFpLPdrtpecsW3pqaWnJh1xknOYeS0v+nGWLT0WrvTStpd6AzJBXPik8ZSNCJX3o/n+88yEUClwqlfyUEwgAdNUTL5FKcpNtXD1JSi86hEoKBcBOQRmGTDOfAkJ/1nhkYL9rWvZTlGGwq8+dvsi+sDbmHgAsiKSS3ARAusZ4U3jsDatQ4Hx3t+0/yjysbdFxXHXquV7lGCKR83EUmf6dlSWbbiqtbVRLwrn18eI9SiV/9jX5xZmOlruSNPGEvbeVKAAWCLKW0Jv+R8t/+teWOjsdxqC0O248SNOLlEqlxPro05YMeVLlodMRkCoJnETt9ktnvOOMmZ2dnQoNZ9bHHAV1dnbqGe84Y6Zpt1/ySAVD3LsLAKwMIVVDhqznT5dKpaRrHLQUjXnsvq28TaGgYz/+ysf0MLqCs6ZdfOPmn70m7Ezq1Gfa4umatdNXfWbFPV3ostvK20IbypgueF32luIt/oT5r78hOyN7elrxHsxmGG27wjGx9iY79Lu97/uP7f/htp2+bcwPxo2HEql2Le8y9265tx+98rnIxiQsQxo5QQGGrVVTb9uyy+YtW3J6uVh2jZJgYCxCqzV5Uy6W3bxlS063bZll1WrqwbA0jAqtskhkY5J++dy9W+7t71reNWal3fGVgzR/j0KBujZv5ulvePlPdZp9jat5TzS0h1NVMZElqcrjfb/4w6nle8pPYzkIxfDyndHNJcFYrtp17tyZbbMP/zfK8RE+dUpDnxiEKrzJGkO73C96fvzEKeW5cwXFoo4HgYyXTTbNd3dTuVx2ri/5IAsJeHjqJSL2qZOo3b6i5YTDbwYBc55YZhDu0BrVBW7OE8sMiNBywuE322n2FT51MhxxUOMfxpP4WvLBcrns8t3d4+begXGzC10qlXx+Td5s+PJd3017krujbGxE4WkYrz1gYpP2O5c5KFpwzjXnf2rLypXpnGXLbLDb0WHOsmV2y8qV6TnXnP+pzEHRgqQ/cUzD2DFXhSh8lItN2lO7e8MX7/pufs34qkaOqzaNzq31SlR1x66/xG5JNCLoMM6t1yvsZGq1motnZj++4KrF529ZuTLtKhSCSA50Ul4o2C0rV6YLrlp8fjwz9/FareqIyAxn+Vci1QikuyWp7uj5Syioc2vnuLqxZlwltOVyWfOz82b9J9btPOrkY6uZGbmzNPEehGG0oSixZxIiRcaef/xJJ35n09+veLyrECpbB04cXbZcvMWd8/6lb8BBmY3CDPJg5SGLkHUEEmcikzzd/7FNX73n7nx33qxYsWJczdV4jNOpq9BlysWyO/fPL9jEB8Vvq1ZTzwRDQ55Aq7/k0USWjMOTbnvvvPVfX/uzsIl4ACpWjTFd8J7FJ9vD2u73FrN86pSZWPeSPnCjbdsTfCZjTfpc+s8bPr/6z/Jr8qZx3nxceZDx2AmrczFXVJV6tj9zrfZLT8ysNIztJoWCGOxcoj4rHTQrd9/8y+YfWiqFfq0DIY75l80/lGbl7vNZ6XAuUWLsVRxA/U05CqhlUl/VWuXJvqsGhVbj7kLAcWk05XJZN2OzLX/pwZ2vfM1RPS0HtZ7rvHcgmOG4PCZDzqmPWm27ac3+jxNPOvnOu26+oy+fz5vuxhWogZcmjndcc+lMPiS3kVrMsUlVvIUxw7rmjABAXTabjfqe3P2XD666e21+dt6s+MCKcRkGj+tSaD3GLeu86/JrWma1Lqn21zzTcERdfyxV8XE2NlTVf8s96c66Y+UdTzVceQi39kUcjbG79JpLZ+6eQfdrFqcm1cQTsWn68KHzDnVxS9ZWn63eu/Hzqxd1Fbq4XCy78frM4/qwUblY9qoquvW5d1V7az+PM8bosG7jq3trIjJJNfGSxamVmeYHb156+smlpSXfVegK1a19WKxKS0t+8SWXdPRO502aw6lpteaImi3sw/AeCm+z1tb6kkd7f/n4u6CqZZTHdQFlvJ/G06VLl/KmTZv69FmX16r0sWVAh/9OaIYxSTXxmuPjZx516Kb5Vy56XblYdnOWLYuC2Q9XHAVbLpbd29799pPkCPmB5HBKUqk6Ih7+QqOqbBmoaV/6dF/+B+t/8Gx+6VIe7x0P4z5x7e7u1vyavFn30dKTh3e++le5admlDiLkDYF0WCEiE7Fz3nPWtkW56IJjTzzusc0rb9vaKAGHnGQvsWqzlLto2XlnZA5tWyc584q0lngmtsOO0IVVrErGWNP3VOXSB76y9rtdhS67YcWGcR/qTojKTnepW7sKXXbz5+/7+bGvOcFH01vP8JK44Zxvbs4hETFSFY2Qs22Z/FEnHVd94HPf+T4UVECBy+VyEMogCoUCb968Ge85/T1y7kcuvgTTzF1itc0n6olHZjfK4jJxzurO2l9956bSlxu5pZsQK8REi4PLxbJb8IEL/iHz8uyySqWaEigaycOKiigTsnGW/XPVVds//9jVW7AlnUiTNlrjDIDOuW7pjfag3AdqvqbwqkxDXoi4RzaoaS6Xi5IdlZX33rj6qok2zhOtoa+5iSjnXH/RbdGszIXV/v6GSGhY0wUQSEk9ecnmckZ6/EP925++/IFvbHikMXkeU/cFPQObtEsuX3Kkn9XydZpmT69Vq56FWRs3ug1nrEkBUXWZlpzV59I77v772y5pVKwm1PhOxI5XKhQKVCwWZclHL/2mnx5fWOvvTQ04Gsmoc70c5mw2Z7nid7nnqtesX7HmduD5Wv9UUsbgZz7nA/l32ukt/1eyfEhSqzijsEo0IqMSlTRuaYvcjr5/uffG1W+GKhoXmkyoxWdC7i6XN5dRQIG/8ukb/6nz9ScfH7XHJ6dpmg4rJxmYRarf+etSjwi5qC1ectwpJx5yaGbmP2/YsKGSX5M33aXuKeE18mvyplQs+a6Tu2acfMl//4KZkflswr7NpYm3SvVkfARLqaq6bGsuSp+q/uTpR56Z/95f/bqK5aCJmOdN3DMTCsLyAqFYlMUfvfSbmM4XVvqT1CgipeE/PEEBgaYGks1mDXa5x5Keyoe+85U7vwM8vzk2Kb3GoGc7533nvd1My/1fnW6PrVWr3nplMBGUMNzxZAUEcHFLZP2udN2v7/3+e7q7H39mrO7VndoCGRBJ/fRgPdwyF1Yr1dQIWdA+PJuqo4y15Am2oit6Htn+yQfveXBHoVDg7u5umixhV6FQ4O7Z3VRaWvJdi7pmTH/1yz+t7dHVygpJnAPRyDdSlSAkabYlE/Euf8ddn73touZnTVRxTHyB7OFJzr3+nbfZmbmLq9Wq1DfSacTPRyICAkxLC0tvsp36/EfvuXH1bQMrbr4koAmbxFN+TZ6bXuPcD7xziU63f0ut0XG+vyIkgDLzyNcVKIikJZc10pPc8e3P3n6RFj7BQBET/ejzZDmWSijURbLow/mPoz37Ka+OvBMhNjzSvJAUIFWH2FgyBtwr91efevZv7/vq+s2DQpNx15o9nOoUAJx9xbmvzXTM+JjmcKGoQmvOKZEduTUQVETYEkccgXrST639wh2faMyFYhJUAyfTue2B1XHxhy7Kp9PoVlhkteadMu1T7xWJqhKJyUXGVD20ol+r7aoUNq5a+zgwsF8wrsuWg/OM/3bu/zjkkGNe/hFk8SG02cj1V6WegBPv2/jAIWMsOa1GvfKetTfcsboRUk0KcUw2gaButAVbLhbd4vcvfYNMj9dqmzncVWr7Flc3vIkneCJwlM0QdrvnbNV/tv/JZ1dsvH1jz3gVymBhzJkzZ/rhpx19BVriD9O06PCkWoOqeqNslPbtV1ZVF+Uylnr9H3iXLl775dt/PBn3kSblzR/N3dqFF1xwmB7J3zTTMl21SkVIQGBDCgFIh9vKhebWsVf1FLHJRBa+3/8WNb0x2frMVzduHDdCeUEoVUCBf3zN1mu4Pf6wbYtelXgHJM4xYAFG/eqYoVMEbYwVKQPqVRiayWXZ9yRl2iYXrVu9evtk7USYtFfjDNr4MguuW/q3PD3+n0ICJOqIYOsXYe/D4ytUoGIjNmxjaG/6W+1Nbtz5o21f/dGPftTTXL07t3bqqFVvFNS1/Hlh5JE3+Ej2nWmEP5cWPtWLgyTeATD7Urho7p6LwlNExsCAetLP3fOF1f8bgJ/MG6uT+u6oQqHAxeXLFUS66JoLz5JpuJXabEdSSRwrm30qBTcwXsWzCkds2Ubwff63xtGNvb/f9c0HV9+zoykUlBqvejhAz7cZmwcOHL3tbW+b3tLZcTla7WXI0cmeUvia91aIhWmfn7V+3Fl8lI2t9PtnarvdFfd/ac23oUqF5ctpIpdxp7RA9gw7zsyfe1T7q6ffIG28KEkc1IsnIqMEjDgUb4ZoAlESpdgYyxF8JX2aqvia9FX/cf0/3PXYC1b45WW/H0rElM/nubPzeQ81792LXpF9WevlmqF325boVak6uJrzrERE4HqeMbKpHvgOVa+GTSa2kGeSh+SJ3vfce8e9v5wqzZ1T5vbBF/QaXZv/MLVFf80tUUtSTTxBGSMMPQabHNWTVlFArSHDcQa+z9WQyF21Wrpq05dKDw7Oj+Zirox41S0UuGuQtwCAsz94wWvjiK+k2FyCNnOQTxO4VDwDRET8UpTYqOB5m42tVlw/Kukn7rlhzQ0AZCodW55a13PW30VCpVLJn37BWbPbXjnrb7jNLnQ+gTrZ50rXnoYlBA82NspYIPGgGv1r6uTWvt89e1e5tOGPIxALdRW6zOCv6TryyGzLuW9cZFvj98DqGSYX2TTx8OIcK3hfS7Z7VqjYsI2iDHxPbXP1iV3Xbrpt/S9UlZZP8pBqagtkjyoXALz92qVXmunR35isnZVUE4WqUOPaTN3HAaqHa6ICEgKxyUTEzJC+5GlK6Q5JcOu9N97+k2a1S1Vp7vK5poyyoAjN5/OMPDB4lZ5/+ZIjoxnZd/pIrjAt0XFiCa6agkQdoAbEL30uRUWZKJPLkOtLdvnnkr/+zop/+vyeYzaVmLIXPDffjlssFmXBuxYcjo7WIuXiK0zMSKqpJyi9lNV48O3LKiogKFtjoiiCq6WQmv4scnyb9tfuWfeV0qN/6mfMuyL/sqgF7+BcdJ5avDVqidtS7+CSVAjUvDmdXrIBiKoSxGYiIynAib/F79z1yfVfX/+bqeg1gkAG5yaD4umzrlg0N+5o+xi18FleFJo4B9BLqnbtkbgooF6JrIktLBOS/prThH5oE7219/HdD6Q16pl1/EGvT8i/mzJ8hs2aQzwLfOKhXh1h/4RRzVgKCo/Y2MgYuH73r+jxH1t/07c27zk2U5XwioBGlSlfer6Jb+F1F16sOf6kbTVHJ6mHOO8IMCDaf+OlKgCEmC3HEawSqr2VfiL0Rdl4FlkDnzo47329I5P4pQh1j3BRRVWMYRNlLNJe/5Sp8sfX3fCNVWi8w760tVMxRb1GEMheKl3N8mlXV1dbxxuPuKLf6l9FrfHMNK1CHDkGDEhp/7wOkZpeRZQUxGyIAXFeSEkBGlRd05e+CiipKAQWJo4zkEr6dFTVf+j5w86bHlj9wHYQkD8/3GMcBDIMoTSNZEF+weHm8BnXSCstsy08M6ml4BROGPsv9HpBCAbs759LCoVC1MDEmQi+1yeo+lXUg0+v+9rq7SGcCgLZp7EZ3Nd0weUXHFY92F6TGL3etkU5n6Tw3ntW0H7LCfZ76KgqgBjDxsYxpOJrpuZuq+zsveG+W+/ZOlCd2j8bmEEgUzU/GdzndMalbz+u/ZCZl6WxXmFb7CHiU/hEnAIMBg+3AfLA6wJqbF0Yvj95Rvvc2lpP+n82fW3tLwY8xsQ+/BUEMq6F8o4zZk571aEXpVn9kGm1r1ZV+JpTqd/wz/s9/BqWMOr3FpuYDRuLtN/viCryVeySmwaHUqPaSBkEMsUoFDjfOM8NAKcdf1r7jDMPX2qzmWVooTdShuv7HF4cAKYDHX41SscgsiZr693rffJrOL0x87v0tlKp9EwQRhDImOcoADD/Q0veytnMu8jwYm41L/PeQxLxqqQENVw/WYF9icKa30P1s3qqIFECjIGxsYXvE5CXDZSkq57a8PADP3z00d0hlAoCGT9C+WTZNU3w7CsXHxG1RRdJNrrE5MxJZBTOOXgHTwBYlXWEeyoDDZFEAlYbRRYEA9efPg2Hb6I3vWX9l0tbml8/Ac/NB4FMdvL5vNmjh8q+fdmSc3iGXcLGnmlzuUMdp9BqAq/kAW3evEJ7S7gJJAo1No7IGkbanzpy/INM6m995lc7Njx4z4M76tHfwPVEQRhBIBMnoW+I52X9rzTnkuULyWAut0QZFYFPHbzCs0AZCiWCNP6foYatIRMZSKKgmjws4u8yff6uu28q/bz5s/e5hT4QBDLW4/unOnMXfHDJsWyiJYjtErF6cpSJM2BAIWjuEhKAJBFwor9l79dTFaVnv7j9n8toiE6V8qWlHPKLIJBJlavsudIvuOrCY13OvckYc4KKP9IRCIKdTPhPU+WfyH/u2rJx48Za8BaBKUOhUOCuQpcd7q0R+TV503iNdVjQggeZemLZjM1/cq+ko7tDQ8IdCAQCgUAgEAgEAoFAIBAIBAKBQCAQOBD8f696pvbMMrqkAAAAAElFTkSuQmCC";function UllrLogo({ size = 80, style = {} }) {
  return <img src={LOGO_SRC} alt="ULLR Systems" width={size} height={size} style={{ objectFit: "contain", display: "block", ...style }} />;
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function StatBlock({ value, label, suffix = "", delay = 0, text = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);
  const numVal = parseInt(value);
  const isNum = !isNaN(numVal) && numVal > 0;

  useEffect(() => {
    if (!inView || !isNum) return;
    let start = 0;
    const end = numVal;
    const step = Math.max(1, Math.floor(end / 112));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setDisplay(end); clearInterval(timer); } else setDisplay(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }}
      style={{ textAlign: "center", background: G.card, padding: "48px 24px", boxShadow: G.shadow, borderTop: `3px solid ${G.green}` }}>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: text ? "clamp(1.8rem, 3.5vw, 2.4rem)" : "clamp(3rem, 6vw, 4rem)", letterSpacing: "0.02em", color: G.green, lineHeight: 1.1 }}>
        {isNum ? display : value}{suffix}
      </div>
      <div style={{ marginTop: 14, fontSize: 13, lineHeight: 1.5, color: G.muted, maxWidth: 220, marginLeft: "auto", marginRight: "auto" }}>{label}</div>
    </motion.div>
  );
}

function ProcessCard({ number, title, text, idx }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={idx * 0.1}>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ background: G.card, padding: "40px 36px", boxShadow: G.shadow, height: "100%", boxSizing: "border-box", borderLeft: `3px solid ${hovered ? G.green : G.border}`, transition: "border-color 0.4s", position: "relative" }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: "0.04em", marginBottom: 14, color: G.green, lineHeight: 1 }}>{number}</div>
        <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: "0.04em", marginBottom: 14, color: G.black }}>{title}</h3>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: G.muted, margin: 0 }}>{text}</p>
      </div>
    </Reveal>
  );
}

function SectionLabel({ text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
      <div style={{ height: 2, flex: 1, background: G.green }} />
      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: G.black }}>{text}</span>
      <div style={{ height: 2, flex: 1, background: G.green }} />
    </div>
  );
}

export default function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} style={{ background: G.bg, color: G.text, fontFamily: "'DM Sans', sans-serif", height: "100vh", overflowY: "auto", overflowX: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: ${G.greenLight}; color: ${G.black}; }
        a { text-decoration: none; }
      `}</style>

      <motion.div style={{ position: "fixed", top: 0, left: 0, height: 3, zIndex: 60, width: barWidth, background: G.green }} />

      {/* Nav */}
      <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
        style={{ position: "sticky", top: 0, width: "100%", zIndex: 40, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 32px", background: `${G.white}ee`, backdropFilter: "blur(12px)", borderBottom: `1px solid ${G.border}`, boxSizing: "border-box" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <UllrLogo size={30} />
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: "0.12em", color: G.black }}>ULLR SYSTEMS</span>
        </div>
        <a href="mailto:info@ullrsystems.co.uk"
          style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "10px 24px", background: G.green, color: G.white, transition: "all 0.3s" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = G.black; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = G.green; }}>Get in Touch</a>
      </motion.nav>

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", minHeight: "calc(100vh - 60px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: G.white }}>
        <motion.div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
            <UllrLogo size={140} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7 }}>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 9vw, 5.5rem)", lineHeight: 0.95, letterSpacing: "0.12em", color: G.black, margin: 0 }}>ULLR SYSTEMS</h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 20 }}>
            <div style={{ height: 1, width: 40, background: G.green }} />
            <span style={{ fontSize: 14, letterSpacing: "0.4em", textTransform: "uppercase", color: G.green, fontWeight: 500 }}>Ballistic Protection.</span>
            <div style={{ height: 1, width: 40, background: G.green }} />
          </motion.div>

          <motion.p style={{ marginTop: 36, fontSize: "clamp(15px, 2vw, 18px)", maxWidth: 560, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7, color: G.muted }}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.7 }}>
            We design and build protection against the biggest threat to life
            in modern conflict zones.
          </motion.p>
        </motion.div>

        <motion.div style={{ position: "absolute", bottom: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
          <span style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: G.muted }}>Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}><ChevronDown size={18} color={G.green} /></motion.div>
        </motion.div>
      </section>

      {/* ══ STATS ══ */}
      <section style={{ padding: "100px 24px", background: G.bg }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal><SectionLabel text="The Threat" /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            <StatBlock value="81" suffix="%" label="Of battlefield injuries in Ukraine are now shrapnel wounds" delay={0} />
            <StatBlock value="45362" suffix="" label="Civilian casulaties were caused by explosive weapons in 2025" delay={0.12} />
            <StatBlock value="1010" suffix="" label="Humanitarians killed from 2023 to 2026 - triple number from the previous three years" delay={0.24} />
          </div>
          <Reveal delay={0.3}>
            <p style={{ textAlign: "center", fontSize: 11, color: G.muted, marginTop: 32, letterSpacing: "0.04em", lineHeight: 1.6 }}>
              Sources: Col. Humeniuk, Chief Surgeon, Ukrainian Armed Forces (Oct 2025) · AOAV (Feb 2026) · UN OCHA (Aug 2025)
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ THE PROBLEM ══ */}
      <section style={{ padding: "100px 24px", background: G.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Reveal><SectionLabel text="The Problem" /></Reveal>
          <Reveal delay={0.1}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", letterSpacing: "0.04em", textAlign: "center", marginBottom: 28, color: G.black, lineHeight: 1.15 }}>
              PROTECTION HASN'T KEPT PACE WITH THE THREAT
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ textAlign: "center", fontSize: 16, lineHeight: 1.8, color: G.muted, maxWidth: 620, margin: "0 auto" }}>
              Fragmentation isn't new. Cheap, precise and prolific delivery of it is. A drone now does what artillery used to and more. Existing protection doesn't move with the people who need it most.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ OUR ANSWER / SHRAPNO ══ */}
      <section style={{ padding: "100px 24px", background: G.bg }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal><SectionLabel text="Our Answer" /></Reveal>
          <Reveal delay={0.1}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.5rem, 10vw, 6rem)", letterSpacing: "0.12em", textAlign: "center", color: G.green, marginBottom: 8, lineHeight: 1 }}>
              SHRAPNO
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 32 }}>
              <div style={{ height: 1, width: 40, background: G.green }} />
              <span style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: G.green, fontWeight: 500 }}>Deployable Fragmentation Protection</span>
              <div style={{ height: 1, width: 40, background: G.green }} />
            </div>
          </Reveal>
          <Reveal delay={0.26}>
            <p style={{ textAlign: "center", fontSize: 16, lineHeight: 1.8, color: G.text, maxWidth: 640, margin: "0 auto" }}>
              A deployable fragmentation protection blanket.{" "}
              <span style={{ color: G.black, fontWeight: 700 }}>Carried by one person.</span>{" "}
              <span style={{ color: G.black, fontWeight: 700 }}>Set up in seconds.</span>{" "}
              Built for soldiers, aid workers, and journalists in the places existing protection can't go.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ HOW WE OPERATE ══ */}
      <section style={{ padding: "100px 24px", background: G.white }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal><SectionLabel text="How We Operate" /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            <ProcessCard idx={0} number="01" title="IDENTIFY" text="Real threats and operational gaps, through data and user testimony." />
            <ProcessCard idx={1} number="02" title="VALIDATE & ITERATE" text="Confirm demand and urgency. Field trials with end users." />
            <ProcessCard idx={2} number="03" title="BUILD" text="Engineer practical protective equipment, driven by operational need." />
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ padding: "100px 24px", background: G.bg }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.2rem, 5vw, 3.6rem)", letterSpacing: "0.04em", marginBottom: 16, color: G.black }}>INTERESTED IN OUR WORK?</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p style={{ fontSize: 15, marginBottom: 36, color: G.muted, lineHeight: 1.6 }}>We're actively building partnerships with defence, government, and humanitarian organisations.</p>
          </Reveal>
          <Reveal delay={0.16}>
            <a href="mailto:info@ullrsystems.co.uk"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 32px", fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", background: G.green, color: G.white, transition: "all 0.3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = G.black; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = G.green; }}>
              <Mail size={16} /> info@ullrsystems.co.uk <ArrowRight size={14} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ padding: "28px 24px", borderTop: `1px solid ${G.border}`, background: G.white }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <UllrLogo size={18} style={{ opacity: 0.5 }} />
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, letterSpacing: "0.12em", color: G.muted }}>ULLR SYSTEMS LTD</span>
          </div>
          <span style={{ fontSize: 12, color: G.muted }}>© 2026 — All Rights Reserved</span>
        </div>
      </footer>
    </div>
  );
}
