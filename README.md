# Cách chạy project

## Cài đặt

Build project cloudformation

```
sam build
```

Deploy project cloudformation

Build lần đầu tiên cần chạy lệnh sau để tạo ra file config

```
sam deploy -g --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

Build lần thứ 2 trở đi

```
sam deploy --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

## Architecture Diagram with AWS
[Link](https://online.visual-paradigm.com/w/ngnuewow/diagrams/?lightbox=1&highlight=0000ff&edit=https%3A%2F%2Fonline.visual-paradigm.com%2Fw%2Fngnuewow%2Fdiagrams%2F%23diagram%3Aworkspace%3Dngnuewow%26proj%3D0%26id%3D1&editBlankUrl=https%3A%2F%2Fonline.visual-paradigm.com%2Fapp%2Fdiagrams%2F%23diagram%3Aproj%3D0%26vpov%3D16.3%26vpob%3D20220410%26client%3D1%26edit%3D_blank&layers=1&nav=1&title=project-architecture&vpov=16.3&vpob=20220410#R3cU2Fsd8GVkX1b9JDy1mjhTvRvDpC218VZ3TMO%2B6HqJr7R%2FxmSgas%3DW8yKonk5tzgjfqAHd9CS%2FB1rdt%2BaIv3uVa2%2BdKJTVp2tT6bbA4n6OMolvGc4eWluACTotjBUhMy7wRGqwDKv1vCRfN8Hx0TW2%2Body0mVYjUyDS0Vt5EZc97hI4%2Bp5AJgC81ho%2FX5VHfN0XCnl7jMhQLpdwKGuJXec8Z9enA89wa2gpQ0rBkkknD93XICD%2F%2F2bgyt18M00M7ypvY9%2FFF%2F8xcxq3XyU4aj6500bUV%2FCiYSA44U%2FklB6K8A68ZYcMnwZPJVf5kv4Zj%2BHRSv2fY5wa%2BmepsJV%2BuEjunt%2BOHbyflbMw4HJC1ozaB2pU3yIcd6vrzRbsl3CYHidp7b9CeK%2FV2KcMtoeK8nj%2FAgKNnek8NyZAEfJEVx3OCFRJvyr3j0W8FEHtcQi0vhny2MMTBYJl8eQSZeCszyXOrZ48fmrKuKPZ%2Fc2s9RGjPV3jRFLA1DINNmoWsqrILOqpiwREzlzYIpEgyf9C5U8rE6JPVU40%2BKjqvyT7fvHx42oHmDmdMRGyv3gIac7536PikiEyk6B4EAM6leMVnzXj%2F4%2FRRrOGIZntsUdooQ8NAVWrphkAobAlBHjNPeLIzK7id0nXNizYQzCYOfckTR8H%2FMcqmsJoTJgn0G4g%2FwH6306fYTdlhHKbZcBK1qHVL0QG5Xzw1NSXxOiOIn%2BOqFFbbZ%2F2v0n2gAJad17RB72UhGYh5NGUR0jZVHW88Tm2OBSyZ6%2Bw0ytZtv5iQHrBcwjVFoa6QyX3dlH9yQ1%2BSr0NjNuCMLFFrhvLFCnnZiJjqGbBdBOEIkwM0JPgw39fLGM2lhQY0hSyA29lYTFKalzN8au8IEyUc3zSQfRSIE0gjerQe0jLD%2B1%2BRRF5Yb1HhTlhYcrfaHuOx5l3qyMOmcN5o2Ogqg8AaG3vr2Vsa6FWd%2FJN10hiEKHf61xNgE1ZThaIQlMjrhXmvYkfqyDIpE5pxNM%2Fc0mT9vj5aTxZEjCqaT968I0KSleywpIwhS%2FBqSHX%2FdfqoAmOvYtqHigrnqUOVrUf1zX4WZlbhy92L0r7e7MTURV6z2VaoY64C5dcPS0wcIGqzGc31Kd9S1Lxd5tAjyOD6F8bu7YMmO5Mn%2FU46wCMb5RJ%2BwFYLOGNtxPdTInDTBShorPyMY4gvlOaQFEPjjMKBKKplz2A0SF6ynOqsS4TroCoh3hCcEXyWseupyLBJilk7ZWYZMt%2F0uNbp6gJ2623ArsJtKRysaE2Hw7xKn0YgUsuBkgqSCn6nXc8FBqlubpDRlThQzexUVetQsC46YGGUlWF64kFpG4OSV0GV4F5yHucZyrb6w1fRq%2FaZf5Vcn8lDoZf60aB9aiJeULXqwbge6YgNgobc2W%2BGPYAeEsCZRytmRG61PGXc5SuIHgufffqM5C9tadmtayee03we2hc3k9mYke623gC6jmfbzTJanBv3EKLFhRj8duZHCWtXC6t8%2FB6HRwvAnQX1Bky9QBhB31HDyEJ%2F4tHoF2qWjsH9YmKMiayI24m4HyMr2vfP9gFKDL7NguvF0WF22jGqE00JENAcgk%2FVZTR6dfterh%2FqhsuTMCTB8cAge1VhIorCN5FRk5gojhdlMEpKxsxEJsjUv9gZVtD6BeeKiGbIkfWzF5sLpNUQYgCacfrSurPmMj1Hgk6oKyqsYWfrCOwIQSf1%2BVWK1ucgdBrvHFKPcd%2FscPmaDh863YhSypAw3KCKQ2%2FYV9ZiUqHxWYZDAFtLH6a6ryWhU%2FIYSUN5Ee5Z9mIHz4X2Tt2QTPOW5xniUURLe%2FgL0a5Ty5c4o13VO3MHfpK2ijOJgIw2J9g%2BWRRQpJj97WCp07HSnMkR97jzMCyaI8VDQvM9Jbb3CDAe7J6Skdd9WMUO6nN0cvdQRoucCzOXJ59E5fOC%2FpZ3Mttn015M3yqNQbodzH0iMYZcRsBneX%2F0COFAEmX8j6y3TLf0CGl6gm2x4PKKgP7o%2B%2FGK5hrgNMJRQY8OyA0JZKldGlC1aKi913zg0jBzeFPDROxf8rwWVLlCJzekAvw4CJFEMjxaFHY8sQczy6%2FARTAHBNVU2XV%2BjlvRmwAyw5xv9yUWUf89BqaLkQym38axamhXwH3RbtpGSSbvH3uh5jostMIwp%2BOPOGKG%2B7tq3I8A8%2B1pg3skxAX3pY7SuBNdXoArbqWZ1afjFHiUfzmD7p5PzrUTv9bsWW2jMSh%2BextZn%2FZ2%2F0CI6ZkurS%2F6BE66gAgr6dHO60O8AF3zO%2B8fXiGDPL5jboHLaACGD8Fs6RoE0TPPMmMw5u55nNJ0BXH2Y2zSy3W1vDDIzvl2Z%2BsbkjTczt3QAaFBcyEvr0erJnIVZdCOl3kxNAw2Dy4WSN96ejBv6BCEv3bfumVviMOYKx6WXLh%2BePt3uhoMgmTpIqBGrxEkZqy2eosC6EgaJlIbZXHEvXKB0p0pkh0XWX8ugj61zkYzNl7OkU%2FXvUrjU6wD32tBOE85vcJ1dZniN22b5uDROF%2Bd3UKo%2BuIdkGPn0tMoLsTNmjNIM0Yfe5OcZm%2FB6eO7izl8dklFefFZsBzfrXNli7Dp7YZ4S8gXfuNX58eG4nV1KKErlgh1dpjHR1Td9VorWA0AG5q2QCSwGKIAC8kboaKdMuKutxv3NF02efBpCNsNaOyno6MRd9NF2MpMMfz%2FERglndN8KAtUnT0JMIOtWPA3cKxES0%2FcH3wim4%2BJOPREt8Yw%2FnIJlLcAPJ9oBpW9OP0cPaAfCJPDOx%2BcKo3hlPqKx3lTjSDVCWREZ%2Fh%2BFTcL75K0z7XUoZJgRdNJIYX3Xxid%2B6jM6iRe10jbnaDAOjV3eNisd3PFwDrCxZ9azXkAf%2BYS7egHAlCykJResP9DjG1Ur4WLJXqE9Dt8e%2BDcgFg42tJUIJWBANJifkEq%2FbE8StTefDDKrorozi8MQsb9LWwieC71tbkCLSHuy2L10n1m06%2B1KhokB%2FTq8x5%2BZpum%2FSTDLHNudxPZq4CkCnGrPmgZtex23c5WhDs7%2BsZyAhS6WyGa6uLbnvzaZZ2x51YqbcecxPWmPkL%2B%2Fw24iJg%2Bi9POp%2Fqr5XQ7NDheDUEX2GHLmx0O2iImA46W4hZIu9DRwZwQUOuTAT3jpSUygRd97hPScQwBzaGFbY3CQ5m58zmKLK%2FKLLYsfy5%2FgreQuR8yWhj0%2BCfYIo5y7YwxxcldogzMqFXoNXhsyc8VEca8dy26pyAofMZpWAvB1cpffxgCbFVarCcNNlDa87CV9yic916QdMwEl02%2FCytjPYoqFi5igQpL6PtMucecmi97Gx7E1T2zUGJ%2FQpbkk3RNSg4Y%2BRYDlw%2FC21niEoJa1Bl3R4JIDbzEvl%2FTZEQqVmlrGxgB%2BQEO5aa7vrs8m4mFBQpJjMjalb12NNHI5ikYqZvlIGyx6Xvz4beESRx680VhABg6nP86OwQSRv2KPlvkRl0rW%2BdDx4jt1oGCRJ3T3Dio0dTOrGBwii2MmkDP8Ui9SE%2BKc0VfH2WV%2BrXDM%2BGrUAmtwBWHDgbDC1R%2FVO0eTQFJGpTNTGSEcssps1MHSRbPJvU%2B4uwLNZehFJTCmnKy4azpr%2BJ1fKG9usgu2Ng0kyUtpG4SFChj86WzUJg8GhY7Vb2WrOOSXUL9vOosJ0KpH0Kj6mKCzB2Q2DAnH4hb5N1zQaSfjaMQv3BkG9w9fo2B3JS6OJNxFVL8TTmFYXxZawc7Cl%2BfHD1RRLJEWmqDafsoDbP7xzthjseB3fYrKzCGRlEDgs0rVDurliPzpkVq%2BAJoRzskXv5YnzSZre0PBo9lIkoveuGi%2FJS35Y9y7xOg3WVDqwSC2l09WDFsvxFhVMai%2FlSaNSDD%2FY0scvOBH5IOXKz6TIPvQrxL49uAdNHOsvyV3LZg8elxgDyJwcKKjygdx2%2F1bL57WkQ3pXT7St9WMsd03ZdMZd2gx4B1vRrqfQYDF7VNbKHpKdPd1XZZlqzmOIwSQXgzcqGrmnbRRWeP7TKAXjdd3s4BJiHzrrNC%2Bt3gfLN981VEYIHdxzEcS0jFKDSwJMoEFDWPBBhV1VCT0xR44LmrKfyLj4gw1uAgbAY2ZTaFzQLNeYwOMaSSiBZ207Sz3FbDuWZPOEO5%2BKvctcoXTL2rJFG6Hz6dE3c3GX3q9gNQzjgTlZsza1C0YrGNTbIUW7LnyRvfjtRlMa%2FdNl240rl177t7R4xj7HdX%2F8IaPOUraWiXmvzbT1LHLd%2BsvUM5ZQ%2FJ9tE63G8ENv8yCpUk6tqhI232zzQSDBZeLTD2l87vJNIcITEe0ig7ElhdnheYR0YsUrtlAPclhdqWLJ1q5SdYRuvzgQ9OWJCheRVDJ3DoBEccI%2BV3L0oIhEfXV%2FmzTCqbetrCI5WKLyL7N4IjQhty5xsu7H5kjdhZFi43fuszcgQa9ZWUvMu2j6JbKk3kI6mHhGUx8h7Aolc88CW6t%2F3Icuo41dNaCWyyz4acm68Hl7yFhLYkP5aOzn7HCUTjOx2rBKqOmOAzAirgA37CjD6txIzQFslAlU4ZZ8ZvjSW8AG%2B3q2nFMlahn%2BIdD9%2FX1M0tEoi2t8bn930KOnPN63QtW5rniVj8FJzuBejD6xeUJPaC%2BMnatUCV4hngautkXWyji2xOdNGvXnvrncdLsZi7PtN8dv%2FFaf9%2BRiu3hjzWeN2%2BH1fY%2FZNR06FGCAxAidIz5BtWIL3s%2F4Rto2m4VqFP8UIhBBZg4SSNYwXVXh8oS%2B42XmSa3AYrckgbzePBewtLPAqzIlHmaxuYB8dZHk1i%2BHlOKQffZMQ1SwHZKQhS6Y33XdOR4Ehs2R6SAJNb2js%2B9iqzqnEZTRy%2Bdv06AowLrTzhN3IpIQ4RjBxQVAsKGKTXKGvQ4LWfpk81CHKduzIZ3zj%2BBUhK9ezgBxZfisnqfbYjb3NbC%2FAqvF6W%2BujSwYUPubjvU23sWetKtyxybyQI7xbISR%2Bf4wih8g5nnjHSxfV8WEsAbEGYMQqxb80Y4VwYaFEAg%2FUmKEjAaf0xctjctKvb786b5BqGeYSJ3CfpX8R9e%2B18Eloqc1JTSHaAN26nSZa1mKnBVgKfpmyQCQplWB5cbe5S9yP468QiHfRgqthAxjjA%2BLpZ9q1TK1twwUWvsl8Sj95yW%2F25Y5jRY4KWO681sDJVKPNuwVgrKCLtRdTzPHmiW5mwfjNn%2FZzHAh8rc5dYRO%2BzLlGUQJzr4wGJEmuJdwHk%2BbQlujCyn%2FAbJtqnbBDKGzODOEm4znXN8ZjEjAkdcCEMsYiRy2jSrU9VSWuNpU6z0A1nVl532EvJ1dzr3cG3xAq5ZD1BDYj%2FK9P6ICW6mhhOoBKtjm6QvTSMfgd9QuDk8CTxY8Dd6eonC7vGm4vm7uJZak7k7OTyxLqNResvhk%2Fg4bVL3Xu0F1X3lkNrgkcOq%2FOOOePhcqSC4JkgRp1rFjfB6dbSTufgOUbzrtQ3%2FCQNYRRv5hKgwd3JCm%2BpnlPERFx4E6PautmT8eRoJJa8K9KsNHHPKTV4xG9e4Y4hiamKVUVpumfiFPdPdMj45eGZxe2PLQdUSn5%2BxNEXA6nnzYFVjKw%2BhDgpJ6JN6hKMzSK7FzICIj186vpSeHBj3SsCCZpz%2Fqs7At5N3loiXN477EBsx1tKiIVUMhsQ3Z3EcdQkDQ0q9cyxefpT2O%2FeOT0SziZvQa48Y5McTCEbxEFUY6Kh9YA7WKnimILtSOR0%2B56IFQInRm%2B%2FjsgQV02PYWm4CVTGdKHX5O08HIDL%2F%2BsgRpKY13%2B7kDPm7qWmyxOCNUHBDkZW1ar9jeaqTydvSmrW4Cn5B4aZB9AmZ9xBBIfOnn%2BmSBOTFSd0mtlFv%2FKVuKEAThg23i0HRCKI3n%2BvDrpHfvd1%2BPE%2B8ZUWWGZndRQNqOGgnUP3Zo%2B%2BZQGRRzC1WjcHuth%2B8a6lSsN1YKZ%2FgaOppxn0JQPzF9B1nTE3OUjsO%2F%2FqJdg45oZWNzE21EhzZ5o2Vy5fCPzNz1G0ytGqNINGNL%2FUEVPSYGaR%2FLcOdYS4R9IlEehVAISDIPuukTO7k81d6gFOJ44cBE72c2ka3HvbZ08cythumoEjqjUDmPplcziYQVw4KY97ZCiDqZPd%2Bb5AQmBucBJf%2BmwiLA5CQM7ydYV%2FWbsGcH%2F3HU9eu1fd9OriDnhKTLCcTeL5uxDQwGmAHWuNT1qUEpws1gkKpLWyG5joMOVQ0rLCXh1hBnxXHY1fOH3dW3dDhsvyI7%2BKWqxdg6NaHZfBF3qBFiYLdy0H5nE%2F3m9E2ck4BIRCulOXZncDosAWxX8Qza6vu8IZWNYotbL5wlK2ifU%2BOdGf%2FFFibKmIiXTaqfkf8fGKG%2Bz8b8UgISq0fbEvxn2L9%2FWK%2FhNeVpO01LA6RyIZ1ybAKk9MURbe6wdkdhqq8ShqjCpDJz7WDxmvgYg9sfcWQnaccxWjMyoRCmmmXAMI0hp53XIgvZIhbbFPkyn5WWnFAdSJUHbHA6wS76ESPTO08LZydudsE176aZ%2FbSAvzjtuQzb5bSAz%2BdRRv6ENI5oETqMKoyHQjoo%2BLt6%2FyIdhOCx1iblJUFvg5a9NirUi1NFxA0tSE2MPTHoyIHeObNtCVtnxkuyG%2FoSWTKiwg0xgBVlAHT44bb%2FaDcG023swf25pwOIbe6aH0d7N7%2BIV3OylicykWi8sRYOzGVFR53QtIufERazNgaafRIBvzFb7H6BMLL2ZcjKyV1r6bWgvMSxlMSy8bwFl12ZI%2B2PjlZYkBvYQr73SbrM2w1NAlea%2Bg46fJIss9icDbzK7trEP0EIuKqGgOXfSVYr%2FBof7XEMS5hiCBDQMgZRKkuVymApeYgTU%2Fp3jfyHC00%2B84yeDMAp4szNxeuIyNOaOC%2BE96wlvnYK8jFcv%2BUpCrMbvEDa6PDZ%2FcBuvyUEb8p1xAirDMzKNUo6yhgxsRXSgLLR788QiO3Z4cw2JLDcIqV8H%2FkZBGYguqc0SxvSEl%2BuoNBtX%2BPMkzncr3O8LZCOshz40%2FUCUwzr1lFirKdMTHPCCc3yZxUuFu8%2FYFjjXXLENmikXhx%2BikqnjR3LiW1Yq%2F6%2BYBTW67vrxt9RoToUoA4GnrKXtSf%2B%2B8vfpeMlnZ%2FkUY6V9EkLXBQ%2Fn%2BgxgPfawqhNI8JxdvGV5JMfOlFzEVI9mmTRdgsIcyg4Kig3xb3n7%2FCcqQ1ahKNjUdw25CZVp2As6YBFkloRlR0LzkmBqA0Da1mES3jZuultpmNh6xDSN5NfcbRbMVI6bM0b3MpJ8iw03Wk%2FSsiyNKAq1kSS6winDLfiphF5OgmfpZy56NsQrIyAfKinUtqLb%2BeeWkElQfKSdAImss%2B8tBgYZTiwoPr6%2Fue04apwGXMoNhJDQn14FkE%2BzzRgDKo9OvJfz%2BMU6%2FAiqyklfXFlFLhiNVVB1lcz%2FIbCeXbOlNSUABYh32lp3zfhJUaVSRbxvH3AxKDduc5vsuTrjUB3JbwVDc0GRxlrErHwDITb3UfIws8YAG0bof28gTZ0R132cxlpCrb6FNa6ErlK8MMcGU8VaTY4rrU5maGyyvgKCOg1KPfBJK%2FS%2F057AUOkDDDfuEs5WvacYhsUXf9zonVucXshZ36sGjHIPfeVfsLBPjYZgtQGIs%2F2yFEDW%2F4T9rtYwhMbhxp1K0V8nW9c%2FdGUUicYqSeJrqT%2F9xMW6ClHi3noM5qqD5uXaafLsGHwic7XaxuV4tBA56ONdRAqw2Sc2%2B6sUh94bInnhLcTr%2F614FesR0gU2PmOtj5fKhMx9zrZDsDFxaCEbK2vNqNclqW2fx3M8HAbeNgyw1RFn0EC654Khp4vR13kAVMoQw2SBpVqey4JCOlb%2FIRChsU%2BJFgborWEjHQR9BRhqFkTw%2FIpzywoV3BI1ZpGX4ntqi8VwNeB52oH14iNvNXwS%2BU%2F4PWoDBLVtefLDnkSmk7tIzetg3bGxZ%2FhBtpXn3SSGXtgsLzfTuQTjxinj69kLxXhh0lBBWb5r%2FBglJeNZpqX74G%2ByDaHzGqrhZkogTAe5uoQRw1ucaGFLj%2F3tRC%2FG0TWUtY8xbpNNt%2FFyazOtOdxmVbEDOil4BK930m29OfWQh2FJTrl7eIfho5N%2F%2Bp6ixwFmgTbMPH7RcMGgSgFAo7WP2RmE%2FyrqgrZUYN1WS9if%2B%2Fjvuptwx%2BLU%2FtdFtpyzRDoiQlbPBsVX1aKtJN6wnktPMIM1n297DUczK1dl%2BnNx29Me80hiZSIMP2UXwEl%2BDPMq9bd%2Bq7iVlA39qTwjNOIPUnC7fH%2BU9yuB%2BV39LmR5EcGORyQD81R5k7dLaxkXLmzYHAU5qa3dMfep14NVRR%2Bmapk1aAcbHJ7Aavz0f93WhJbduBtJeIqmBuciRl0EGOd0%2Fm6IMg2EKUj3V1Lb4h40MAGY1YmgS2mH0HhHkkTQdNHkYIURnBJ7nFfUuyWUSAr%2FYcX5HcD1c6JCt%2BSd2Yio5dxjhfs4vmuWxowls23RnjUbJ2Zi%2FHZhxr%2Fq2MUb0LR70DGdZ%2BhElsWtfnN85oqGYtISzvbFCLxS6Nl3tHZkHmI%2Ba85%2BfkZRsL6CigXK6JOrRnQqw%2FbtoA2JZFLBj8VHrtzjF1%2FaUn1RAvU0erWjy3SjLaXq8LGh9pKmrLJfJGHUqk5rl1zrk1%2B%2FV915U6RIKhtRL2%2FSqeIYmYAIFkx2ytiq%2F2YOcnNQKZBKyYA9VC0TEdIwuY3hwNGsoUGJaeszjIpIB5RPHhNPeSkjkBBLSs31K4Njncfpj0jjl7I3lQE4UfSWBxL%2BZ84TqcRAMGE5LOY5oGaYIt4Ssz%2FiqQNZRyyQFtQeHeEy6ShHh%2BJc%2BTXhisrRRt7%2FtY7TBMsFQ5zYhYJnOku8E20EVj8HpnIzROqyaWjwK2vW76mm2HPLHsPhgP4bjRiIP3CZhKpRzgNFk6kT%2BZ8zxhZ4dstudUIHguej1LsKi0qYq3is3f%2F6X9StEnN%2Bfrt0HZ6W6dKkl1oWHTmbo1kUWn0l20QB3kI7ed%2BomewbhSIcoSSu21nras7FhRquF1hDPi869d71%2Bv763dy0v8vc7RIJMBZjy6%2BHTUxHS%2B9KDGQb0CqjQsO8pEfdV3QdoO3xeWifs6yLU%2Flfe%2Bm8945yS2D4TsWmIOlwFXHE7kjiL7iewdU21yPGlj0coqcD5LE1fGS%2FpdpQNqz1eGFv6vdLxsPNsgJjuBL%2F0jUlltC9q6hGf7cIEEJWNlDX66PHTNOmpjODtiX4tsfnWMdPRGburM3sGPAcVwPCA3%2B1hcQNki4GZlGRAMtbQmXyK8tIze3x1HcRoGt8UKhac5xYPT2sQcXBaHhT9gW9PEAZBUf0u20nm0rlGI5i7wS15Fnk9FQJ84Vjwd%2B1ey0IaQEQTyEB54Z%2FxQCUHv%2FzzIsarOKutPfS0iOTpP4DAeGXmIjb%2B0FF9%2BRs0kSmvh8BMUsUQjVcrDtinKjYTxJ72TxK3BDs83Hwjv3TP28w4GNdJ7PVEGmhNjqCyleyCqhtLoCPVNjIqqEh5DMl3QUf1bOm8NWd6cNHt4apIcih3YNhXk01cP4j0QOTuHD1vMLT9497SlCMDW5SN7l0hPxOTrDmODCToUkxJ0%2B1ak1%2BzEuy8DgnoyVKYGhk1B%2FtcYrfuMb5UatTLyL4ja9qf%2BG9%2BWOExKkM0NFE38sNOaOlkXGW3Yrtmln8zwCesq29403B4GBRzr3LMN5JLf250brYq5NZAo%2BYPvqbWo8WBfi4jYPk2ph1jn6mxJlEqPhJFoRilsvNIIeJVtG0TD%2FkkwGwvQT9gSZBiGQ%3D%3D13jjs1fa)
