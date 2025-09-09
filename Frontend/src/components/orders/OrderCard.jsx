import React from 'react'
import OrderList from './OrderList'
import'./OrderCard.css'

const OrderCard = () => {

  const orders = [
    {
      name: "Classic Wristwatch",
      orderId: "123456",
      status: "Delivered",
      statusClass: "status-delivered",
      total: "$120.00",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCwFC7TFeS4VX7Ey91yp8ihHCgeqQFL5xLB9Y70hCC9DAHs8prlnsnrkulVeX04HdR6qBqhcsMOrQ-sHh-sG5ZpPMYudO8-WIpXD0Vtpy0BzkMJ1cg2u1r2IKCoItEthxrw47UFqsP9L_FecdlnY_L3UaVjj-JvdXemlBE7Ame2Rt1nmJmdF7W4nn-s2gjZEYaxQBj4nOEDlG9OW5JDix0yMTXh5_zNcnWpJUbxsuAz20994URuqP5FFJkELXNFY6ccOyl2hnZNMp4l",
    },
    {
      name: "Running Shoes",
      orderId: "789012",
      status: "Shipped",
      statusClass: "status-shipped",
      total: "$85.50",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAiEqMA-cz1FnDghvAPwfqbMdZpKoaTi1jRs-eEy_C3uYE6x7uPPhcPcqrWre5mn5rJf-2NobivNeliRn1YddD3wqFex9c5EXUXY8dMYVrrrH-Ir1l3K08fTN1uGmJpoYQfwlSKQbF8ROVkWv-v_v1LZdCprKcXjsbuw8rmFRE5-VLHujPLDWrQYMurt8X3oHeOFh8_UZ9t1U-q4kOQKpNInFXXzhoxkP9cdennHXGodyH8JHaRv5HowKGKQcSQGneO_bnu0bXLBefk",
    },
    {
      name: "Headphones",
      orderId: "345678",
      status: "Pending",
      statusClass: "status-pending",
      total: "$210.75",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBRN2MqbQSzLJxRkYTTfmxBEbowORxlhktncHVqllWdd_mWJXQuW-zlcwhZGUi8oQuDbasDzXiQ93XS0RoYxbeotEKgFy867-qfKcoyX1A4o-lGD8AyS6CjeNi1XV0jA_idfrnvVEAFTdKQNH8ec5yQgod3iOmG4o-VCSqFaZZVXI09R0oIs2QDA6vGSh1Obae17SRK8oTu-7SJWEQBtPkunDiwppGvIDuaAkxXBoqKxuH8sstjIgJxKx66NVT8Sofsc7rPkcORo5eT",
    },
    {
      name: "Sunglasses",
      orderId: "901234",
      status: "Delivered",
      statusClass: "status-delivered",
      total: "$150.00",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDjUkSkmfVWQmabdfAQpKd32JNPwfgO1zxtV0AFFT-p1cZJ2Qc8oIiFGZhYwQwi4tdsffBXdziei8T9v_fWFWJGHBwxTaAxfnjWIbWsz0CyChdU0za4KUaB0vML44WV3gaG8-g7KMdINtj8RlnBgXlSdu5pPtwX8cewDPyK2DpcZ4SNcM0H0lwTPHLTwVpR5wz5SmjHAmLDBcmD4NBWha8Yn1ZpLWLj_hCR02dswSMZHAfoWCOGABe7HjFIe3KcDU1UCFqlZsbP-dGE",
    },
  ];

  return (
    <>
     <main className="orders-main">
      <div className="orders-container">
        {/* Header */}
        <div className="orders-header">
          <h1 className="orders-title">My Orders</h1>
          <p className="orders-subtitle">
            Check the status of recent orders, manage returns, and discover
            similar products.
          </p>
        </div>

        {/* Orders List */}
        <div className="orders-list">
          {orders.map((order, index) => (
            <OrderList key={index} product={order} />
          ))}
        </div>
      </div>
    </main>
    </>
  )
}

export default OrderCard
