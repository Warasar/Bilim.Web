import React, { useEffect, useRef, useState } from "react";
import Modal from "../../modules/YaKIT.WEB.KIT/components/Modal/Modal";
import Input from "../../modules/YaKIT.WEB.KIT/components/Input/Input";

export const useClickOutside = (handler: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handler]);

  return ref;
};

export default function TourHeader() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [mail, setMail] = useState<string>("");

  const headerClassName = !isScrolled ? "tour-header" : "tour-header-scrolled";

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);

      document.querySelectorAll(`[id*="tour_"]`).forEach((element: any) => {
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition + 100 >= offsetTop && scrollPosition + 100 < offsetTop + offsetHeight) {
            setActiveSection(element.id);
          } else if (scrollPosition < 100) {
            setActiveSection(null);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const clickScrollIntoDiv = (id: any) => {
    const element = document.getElementById(`tour_${id}`);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  // меняет input
  const changedString = (e: any, code: string) => {
    if (code === "mail") {
      setMail(e.target.value);
    } else if (code === "phone") {
      setPhone(e.target.value);
    } else {
      setName(e.target.value);
    }
  };

  return (
    <div className={`${headerClassName}-bg`}>
      <div className={`${headerClassName}`}>
        {/* лого  */}
        <div
          className={`${headerClassName}-logo`}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth", // для плавной прокрутки
            });
          }}
        />

        {/* кнопки */}
        <div className={`${headerClassName}-flex`}>
          <div
            className={`${headerClassName}-flex-item${activeSection === `tour_about` ? "-active" : ""}`}
            onClick={() => clickScrollIntoDiv("about")}
          >
            О нас
          </div>
          <div
            className={`${headerClassName}-flex-item${activeSection === `tour_video` ? "-active" : ""}`}
            onClick={() => clickScrollIntoDiv("video")}
          >
            Видеообзоры
          </div>
          <div
            className={`${headerClassName}-flex-item${activeSection === `tour_products` ? "-active" : ""}`}
            onClick={() => clickScrollIntoDiv("products")}
          >
            Наши продукты
          </div>
          <div
            className={`${headerClassName}-flex-item${activeSection === `tour_otziv` ? "-active" : ""}`}
            onClick={() => clickScrollIntoDiv("otziv")}
          >
            Отзывы
          </div>
        </div>

        {/* связаться и пользователь */}
        <div className={`${headerClassName}-flex`}>
          <div className={`${headerClassName}-button`} onClick={() => setModalVisible(true)}>
            <div className={`${headerClassName}-button-mail`} />
            Оставить заявку
          </div>
        </div>

        <Modal
          open={modalVisible}
          onCancel={() => {
            setModalVisible(false);
          }}
          title={<div className={`tour-header-modal-title`}>Получите консультацию от наших специалистов</div>}
        >
          <div className="tour-header-modal">
            <div className="tour-header-modal-subtitle">
              Мы свяжемся с вами в ближайшее время, проконсультируем по всем вопросам и поможем подобрать наиболее
              подходящее вам решение.
            </div>
            <div className="tour-header-modal-item" key={`survey-item-name`}>
              <div className="tour-header-modal-item-text">Имя*</div>
              <Input value={name} onValueChanged={(e: any) => changedString(e, "name")} type={"string"} size="big" />
            </div>
            <div className="tour-header-modal-item" key={`survey-item-name`}>
              <div className="tour-header-modal-item-text">Телефон*</div>
              <Input value={phone} onValueChanged={(e: any) => changedString(e, "phone")} type={"phone"} size="big" />
            </div>
            <div className="tour-header-modal-item" key={`survey-item-name`}>
              <div className="tour-header-modal-item-text">Электронная почта</div>
              <Input value={mail} onValueChanged={(e: any) => changedString(e, "mail")} type={"mail"} size="big" />
            </div>
            <div className="tour-header-modal-subtitle" style={{ paddingTop: "12px" }}>
              * - обязательные поля для заполнения
            </div>
            <div className={`tour-header-modal-button${name.length && phone.length ? "" : "-disabled"}`}>
              Оставить заявку
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
